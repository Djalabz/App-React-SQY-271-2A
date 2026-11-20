// Dans cette page de Chat on veut : 

// Une zone d'échange des messages / Un fil de discussion
// Une zone pour poster les messages 
// Se concentrer sur le front pour le moment -> Ne pas hésiter à vous inspirer de services existant 

// Il faudra donc une icone dans la navbar (ou ailleurs, à trouver sur MUI)
// Il faudra mettre aussi à jour les routes 

// Pour le moment on veut juste controler l'input et afficher les messages 
// dans le fil de discussion

import { useState, useEffect, Fragment } from "react"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


function Chat() {
    const [message, setMessage] = useState("")

    return (
        <>
            <Box
                component="chat"
                sx={{ width: "60vw", padding: "2rem", border: "solid 1px lightgrey", margin:"auto", display:"flex", flexDirection: "column",
                borderRadius: "20px" }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    name="chat"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <SendIcon />
            </ Box>
        </>
    )
}

export default Chat