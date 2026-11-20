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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext } from "react"

import { useAuth } from "./context/AuthContext"

function Profile() {
    let { user, setUser, token, setToken } = useAuth()
    const [edit, setEdit] = useState(null)
    const [inputValue, setInputValue] = useState({
        username: user.username,
        email : user.email, 
        description: "",
        avatar : ""
    })

    console.log(user)

    function handleChangeInfos(field) {
        if (edit === field) {
            setEdit(null)
            
        } else {
            setEdit(field)
        }
    }

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
                        <Avatar alt="" src="">RJ</Avatar >
                        {/* < EditOutlinedIcon onClick={() => handleChangeInfos()} /> */}
                    </div>
                   <div>
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
                        
                        < EditOutlinedIcon onClick={() => handleChangeInfos("username")} /></div>
                   <div>
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
                            
                            < EditOutlinedIcon onClick={() => handleChangeInfos("email")} /></div>
                   <div>
                        <h3>Description : ...</h3>
                        < EditOutlinedIcon onClick={() => handleChangeInfos()} /></div>

                    <Button>Enretgistrer les modifications</Button>
            </Box>

        </>
    );
}

export default Profile;