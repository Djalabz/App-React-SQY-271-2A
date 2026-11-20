// Ici page de profil ! 

// Il nous faudra une photo de profil de type Avatar
// Il faudra afficher le usename, l'adresse mail renseignée 
// Pourquoi pas une catchphrase ou une description  

// On doit pouvoir pour chaque information qui est affichée la modifier -> Req de type PUT

// Il faudra aussi s'occuper de l'API -> Coder la ou les routes correspondantes 
// Il faudra aussi s'assurer que tout concorde avec la BDD (rajouter lm'avatar, la catch phrase etc)

// Pour ce qui est des avatars on peut les enregistrer dans le projet directement (on stockerait juste le chemin vers l'image en BDD)
// Pour aller un peu plus loin on pourra regarder comment uploader un avatar.

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useState, useEffect, useContext } from "react"

import { useAuth } from "./context/AuthContext"

function Profile() {

    let { user, setUser, token, setToken } = useAuth()

    console.log(user)


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

                    <Avatar alt="" src="">RJ</Avatar >

                    <h2>Username : { user.username }</h2>

                    <h2>Email : { user.email }</h2>

                    <h3>Description : ...</h3>
            </Box>

        </>
    );
}

export default Profile;