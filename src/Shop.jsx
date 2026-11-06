import { useState, useEffect, useContext } from "react"
import { ShopContext } from "./context/ShopContext"
import { useNavigate } from "react-router-dom"

import "./Shop.css"

// TODO :

// On voudrait idéalement regrouper tous les produits ainsi que leur notes dans un state products 
// On pourrait ainsi grace au contexte partager ce state à tous les endroits ou en a besoin -> page produit, cart, shop etc...


function Shop() {
    const { products, setProducts, cart, addToCart } = useContext(ShopContext)

    let navigate = useNavigate()

    // On vient fetch les produits depuis la Fake Store API lors du render initial
    useEffect(() => {
        fetch('http://localhost:3000/product/all')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setProducts(data)
        })
        .catch(err => console.log(err))
    }, [])

    // On vient enregistrer le cart en LS dès que le state cart change de valeur
    useEffect(() => {
        window.localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]) 


    return ( 
        <>

            <section className="products-grid">

                {products && products.map((product) => (
                    <div onClick={() => navigate("/product/" + product.id_product)} key={product.id_product} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <h3>{product.price} £</h3>
                        <button onClick={() => addToCart(product)}>Ajouter au panier</button>
                    </div> )) }

            </section>
        </>
    );
}

export default Shop;