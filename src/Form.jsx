import { useState, useEffect } from "react";

// Imports MUI 
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


function Form() {
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        confirm: "", 
    })
    const [view, setView] = useState("signup")
    const [inputTypes, setInputTypes] = useState(["username", "email", "password", "confirm"])

    useEffect(() => {
        if (view === "signup") {
            setInputTypes(["username", "email", "password", "confirm"])
        } else {
            setInputTypes(["username", "password"])
        }
    }, [view]) 

    return ( 
        <>
            <Box
                component="form"
                sx={{ width: "45vw", padding: "2rem", border: "solid 1px lightgrey", margin:"auto", display:"flex", flexDirection: "column",
                borderRadius: "20px" }}
                noValidate
                autoComplete="off"
            >
                <ToggleButtonGroup
                    color="primary"
                    value={view}
                    exclusive
                    aria-label="Platform"
                    onChange={(event, newView) => setView(newView) }
                >
                    <ToggleButton value="login">Login</ToggleButton>
                    <ToggleButton value="signup">Signup</ToggleButton>
                </ToggleButtonGroup>



                <h1 style={{ marginBottom: "5rem" }}>{ view === "signup" ? "Signup" : "Login"}</h1>

                {inputTypes.map(type => (
                    <TextField 
                        key={type}
                        type={ type == "password" || type == "confirm" ? "password" : "text" } 
                        name={type}
                        value={formData[type]}
                        placeholder={"ici le " + type}
                        onChange={(e) => setFormData({ ... formData, [type] : e.target.value})}
                        variant="outlined"
                        label={type}
                        sx={{ marginBottom: "1rem" }}
                    />)
                )}

                <Button sx={{ height: "3rem" }} onClick={() => handleSubmit()} variant="contained">Submit</Button>

            </ Box>
        </>
     );
}

export default Form;
