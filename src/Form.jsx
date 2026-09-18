import { useState } from "react";

// Faire un form de type login / signup 

// L'idéal serait de pouvoir switcher via un bouton sur ce meme composant entre login et signup

// Il y aurait du coup email, username, password, confirmation
// Ne pas hésiter à refactoriser les inputs (Vous pouvez ceci dit commencer simplement)
// Vous pouvez styiliser avec MUI ou autre attentino à bien installer toutes les dépendances si c'est le cas

function Form() {
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        confirm: "", 
    })

    let inputTypes = ["username", "email", "password", "confirm"]

    return ( 
        <>
            <h1>Form en React</h1>

            {inputTypes.map(type => (
                <input 
                    key={type}
                    type={ type == "password" || type == "confirm" ? "password" : "text" } 
                    name={type}
                    value={formData[type]}
                    placeholder={"ici le " + type}
                    onChange={(e) => setFormData({ ... formData, [type] : e.target.value})}
                />)
            )}

            <button onClick={() => handleSubmit()}>Submit</button>
        </>
     );
}

export default Form;
