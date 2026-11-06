// Dans cette page on peut utiliser useParam qui permet de récup les paramètres dans l'url
// De cette manière on recup l'id du produit et faire une requete API 
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react"
import { ShopContext } from "./context/ShopContext";
import { useAuth } from "./context/AuthContext";

import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import "./Product.css"


// TODO : 

// Ajouter une section de commentaires 

// En React -> Utiliser MUI poour faire un formulaire de commentaires et une zone d'affichage de ces commentaires; 
// Si pas de commentaires un message suffit (Aucun commentaire pour le moment).

// En Node -> Créer le route permettant de publier un commentaire 

// En BDD -> Soit créer une table commentaire à part entière soit joindre la table commentaire et rating 


function Product() {
    let { logout } = useAuth()
    let { products, product, setProduct, ratings, setProductRating } = useContext(ShopContext)
    let token = localStorage.getItem("token")
    let params = useParams()

    // On vient chercher dans le state des produits (products) celui qui possède bien l'id recup dans les params de l'URL
    useEffect(() => {
        products.forEach((item) => {
            (item.id_product == params.id) && setProduct(item)
        })
    }, []) 

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
                    value={product.moyenne_note}
                    onChange={handleRatingChange}
                    precision={0.5}
                />
                <h4>{product.description}</h4>
                <Button variant="contained">Ajouter au panier</Button>
            </div>
        </>
    );
}

export default Product;