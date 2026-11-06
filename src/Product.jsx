// Dans cette page on peut utiliser useParam qui permet de récup les paramètres dans l'url
// De cette manière on recup l'id du produit et faire une requete API 
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react"
import { ShopContext } from "./context/ShopContext";
import { useAuth } from "./context/AuthContext";

import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import "./Product.css"


// A FAIRE ENSUITE 

// 1 - Il va falloir charger nos produits depuis la table products de notre base et afficher pour chacun la moyenne de ses notes 
// Cela implique donc de changer la requete http depuis React et coder la route qui permet de renvoyer les produits et leurs infos de la BDD vers le front 

// 2 - La suite : Ajouter une table commentaires -> pourquoi pas la fusionner avec celle des notes ?


function Product() {
    let { logout } = useAuth()
    let { product, setProduct, ratings, setProductRating } = useContext(ShopContext)
    let token = localStorage.getItem("token")
    let params = useParams()
    let note = ratings[params.id] ?? null

    // Il va falloir adapter ce useEffect afin de recup les produits depuis la BDD
    useEffect(() => {
        fetch('https://localhost:3000/product/' + params.id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProduct(data)
        })
        .catch(err => console.log(err))
    }, [params.id])

    // Le composant Rating de MUI permet de récupérer la note ici avec newValue en 2eme argument. 
    // Une value de Null équivaut à zéro ou pas d'étoiles 
    function handleRatingChange(event, newValue) {
        setProductRating(params.id, newValue)

        if (newValue == null) {
            return
        }

        fetch('http://localhost:3000/product/rating', {
                method: "POST" ,
                headers : {
                    'Content-Type' : "application/json",
                    'Authorization' : `Bearer ${token}`
                },
                body : JSON.stringify({ product_id : params.id, note : newValue })
        })
        .then(res => {
            // Ici le res.ok permet de vérifier si on recup une erreur (400,401,500) depuis l'API
            // res.status permet aussi de recup directement le status de l'erreur 
            if (!res.ok) {
                logout()
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    return ( 
        <>
            <div className="productCard">
                <h2>{product.title}</h2>
                <img src={product.image} alt={product.title} />
                <h3>{product.price} $</h3>
                <Rating
                    name="product-rating"
                    value={note}
                    onChange={handleRatingChange}
                />
                <h4>{product.description}</h4>
                <Button variant="contained">Ajouter au panier</Button>
            </div>
        </>
    );
}

export default Product;