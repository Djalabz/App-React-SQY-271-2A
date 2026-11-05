// Dans cette page on peut utiliser useParam qui permet de récup les paramètres dans l'url
// De cette manière on recup l'id du produit et faire une requete API 
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react"
import { ShopContext } from "./context/ShopContext";
import { useAuth } from "./context/AuthContext";

import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import "./Product.css"

// Exercice notation :
// On veut permettre aux User de pouvoir noter un produit (ex : avec des étoiles)
// Sous chaque produit on affiche la moyenne des notes 

// React : 
// Coder ce qui sera visible (partie avec les étoiles), rendre la chose visuellement dynamique 
// Associer un state à la note donnée 
// Transmettre cette note à l'API -> "product/note" par exemple 
// Dans la requete vers l'API bien intégrer le JWT avec Authorization : Bearer <token>

// Node : 
// Ajoute la route d'ajout de notes pour le user -> utiliser le middleware authJWT
// Enregistrer la note en BDD et renvoyer un message de confirmation 

// BDD : 
// Associer un User à une note et un produit ... Créer une table Note avec 2 clés étrangères : celle du user lié et du produit 

// A FAIRE ENSUITE 

// Il va falloir charger nos produits depuis la table products de notre base et afficher pour chacun la moyenne de ses notes 
// Cela implique donc de changer la requete http depuis React et coder la route qui permet de renvoyer les produits et leurs infos de la BDD vers le front 

// La suite : Ajouter une table commentaires -> pourquoi pas la fusionner avec celle des notes ?


function Product() {
    let { setToken } = useAuth()
    let { product, setProduct, ratings, setProductRating } = useContext(ShopContext)
    let token = localStorage.getItem("token")
    let params = useParams()
    let navigate = useNavigate()
    let note = ratings[params.id] ?? null

    // Il va falloir adapter ce useEffect
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + params.id)
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
                setToken(null)
                localStorage.removeItem('token')
                navigate("/")
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