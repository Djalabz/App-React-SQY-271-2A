import { useState, useEffect } from "react"

// Dans cette page de eshop on va afficher une liste de produits depuis la Fake Store API (voir la doc)

// On va utiliser useEffect pour le fetch et useState pour la gestion du state 

// Afin de lister/afficher les produits on pourra utiliser .map 

// On doit pouvoir ajouter des produits à un panier cad enregistrer les produits sélectionnés en 
// Local Storage 

import "./Shop.css"

function Shop() {
    const [products, setProducts] = useState(null) 
    const [cart, setCart] = useState(window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) : [])

    // On vient fetch les produits depuis la Fake Store API lors du render initial
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
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

    // Trouver un moyen de modifier seulement la quantité d'un produit quand 
    // celui-ci est déjà dans le cart 

    function addToCart(product) {
        // On vient vérifier si le produit est déjà ou pas dans notre cart 
        if (cart.find((item) => item.id == product.id)) {

            // On crée une variable qui va contenir l'item modifié au niveau de sa quantité
            let newCart = cart.map((item) => {
                return (item.id == product.id) ? { ... item, qty: item.qty + 1 } : item
            })
            setCart(newCart)

        } else {
            // Sinon on ajoute simplement le produit dans le cart 
            let newObj = { ... product, qty: 1 }
            let newCart = [ ...cart, newObj]
            setCart(newCart)
        }
    }

    // On vient vérifier la qty, -1 ou on supprime le produit selon
    function deleteFromCart() {

        // Imlpémenter cette fonctionnalité 

    }


    console.log(cart)

    return ( 
        <>

            <section className="products-grid">

                {products && products.map((product) => (
                    <div key={product.id} className="product-card">
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