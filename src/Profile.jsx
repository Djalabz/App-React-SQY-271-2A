// Ici page de profil ! 

// faire apparaitre l'avatar sur la page de profil mais aussi dans la Navbar 
// Réfléchir à la manière dont ion peut uploader un nouvel avatar 

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext } from "react"

import { useAuth } from "./context/AuthContext"

import "./Profile.css"

function Profile() {
    let { user, setUser, token, setToken } = useAuth()
    const [edit, setEdit] = useState(null)
    const [inputValue, setInputValue] = useState({
        username: user.username,
        email : user.email, 
        description: "",
        avatar : ""
    })

    // Fonction qui permet de passer en mode edit pour modifier les infos
    function handleChangeInfos(field) {
        if (edit === field) {
            setEdit(null)
            
        } else {
            setEdit(field)
        }
    }

    // Fonction qui vient confirmer le changement et les envoyer vers l'API puis BDD
    function handleSubmitProfile() {

        console.log(Object.entries(user))

        let isChanged = false;

        // S'assurer qu'il y a bien eu des changements au niveau des informations données
        Object.entries(user).forEach(([key, value]) => {
            if (inputValue[key] != value) {
                isChanged = true
            }
        })

        if (isChanged) {
            // On peu fetcher pour envoyer les modifs au back
            try {
                fetch("http://localhost:3000/user/profile", {
                    method: "PUT", 
                    headers :{
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body : JSON.stringify(inputValue)
                })
                .then(data => data.json())
                .then(result => {
                    console.log(result)
                    // setUser(inputValue)
                }) 
            } catch(err) {
                console.log(err)
            }
        }

        // Ensuite on vient faire une req HTTP qui va nous permettre de modifier des inofs existantes 
        // On enverra donc ces infos dans le body sans oublier le token qui viendra valider cette action

        // Lorsque c'est validé et que l'on a un retour de l'API on peut afficher un message de confirmation 
        // "Les modifications ont été effectuèes avec succès"

        // Vous pourrez organiser le tout avec un try et catch pour gérer les erreurs.
    } 

    function handleChangeAvatar(e) {
        console.log(e.target.files[0])

        setInputValue({ ... inputValue, avatar : e.target.files[0] })
    }

    console.log(inputValue)

    return ( 
        <>
            <h1>Page de profile</h1>
                <Box
                    component="form"
                    sx={{ width: "45vw", padding: "2rem", border: "solid 1px lightgrey", margin:"auto", display:"flex", flexDirection: "column",
                    borderRadius: "20px" }}
                    noValidate
                    autoComplete="off"
                >
                   <div>
                        <Avatar sx={{ width: "5rem", height : "5rem", margin: "auto" }} alt="" src="/src/uploads/avatar-cameron.webp" />
                        <input type="file" accept="image/*" onChange={(e) => handleChangeAvatar(e)} />
                    </div>

                   <div className="profile-row">
                        <h2>Username : </h2>
                        { (edit == "username") ? 
                            <TextField
                            name="username"
                            variant="outlined"
                            placeholder={user.username}
                            value={inputValue.username}
                            onChange={(e) => setInputValue({ ... inputValue, username: e.target.value })} />
                            : 
                            <h2>{inputValue.username}</h2>
                        }
                        
                        < EditOutlinedIcon onClick={() => handleChangeInfos("username")} />
                    </div>

                        
                   <div className="profile-row">
                    <h2>email : </h2>
                        { (edit == "email") ? 
                            <TextField
                            name="email"
                            variant="outlined"
                            placeholder={user.email}
                            value={inputValue.email}
                            onChange={(e) => setInputValue({ ... inputValue, email: e.target.value })} />
                            : 
                            <h2>{inputValue.email}</h2>
                        }
                        < EditOutlinedIcon onClick={() => handleChangeInfos("email")} />
                    </div>

                   <div className="profile-row">
                        <h2>description : </h2>
                            { (edit == "description") ? 
                                <TextField
                                name="description"
                                variant="outlined"
                                placeholder={user.description}
                                value={inputValue.description}
                                onChange={(e) => setInputValue({ ... inputValue, description: e.target.value })} />
                                : 
                                <h2>{inputValue.description}</h2>
                            }
                            
                        < EditOutlinedIcon onClick={() => handleChangeInfos("description")} /></div>

                    <Button onClick={() => handleSubmitProfile()}>Enregistrer les modifications</Button>
            </Box>

        </>
    );
}

export default Profile;