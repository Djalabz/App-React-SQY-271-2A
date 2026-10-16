// Améliorer le random student ... On veut que ça claque !

// Inclure au moins une librairie externe -> Pour de l'animation, du style, de la 3D... Feel free !

// Il faut qu'on voit la tete des etudiants -> photos Netypareo ok ou autre 

// Idées : faire comme une roue de la fortune par exemple ! Ou encore un effet casino !

// Autre chose : Faire un système de point -> Le prof doit pouvoir appuyer sur un bouton pour valider ou non la réponse donnée.
// Une réponse validée = +1 sinon pas de points. Le total des points par élève et leur classement doit etre dispo sur la meme page.

// Pourquoi pas meme enregistrer ces données en BDD ? 

import { useState } from "react";

let students = ["Abdallah", "Nohlan", "Soen", "Ethan", "Mathis", "Tony", "Louis"]

function Random() {
    const [randomStudent, setRandomStudent] = useState("")
    const [list, setList] = useState([... students])


    function generateRandom() {
        let newRandomStudent = list[Math.floor(Math.random() * list.length)]
        setRandomStudent(newRandomStudent)
        setList(list.filter(student => student != newRandomStudent))
    }

    function reset() {
        setList([... students])
        setRandomStudent("")
    }
    
    return (  
        <>
            <h1>Random Student !!</h1>

            { (list.length) 
            
            ? <button onClick={() => generateRandom()}>Random !</button>
            
            : <button onClick={() => reset()}>Reset</button> 

            }
-
            <h2>{randomStudent}</h2>
        </>
    );
}

export default Random ;