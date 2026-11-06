import { useState, useEffect, useContext, createContext } from "react"

// TODO : 

// 1 - Vérifier aussi le contenu avec le back lors du démarrage ? on pourrait appeller une route /api/me (ou /api/validate). 
// 2 - Si le backend répond 401, on déconnecte immédiatement.

// Vérifier la validité du token -> expiration 

const AuthContext = createContext()

export function AuthProvider({ children }) {
    // On va réunir l'ensemble des states et fonctions liées à l'authorisation
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        confirm: "", 
    })
    const [view, setView] = useState("login")
    const [inputTypes, setInputTypes] = useState(["username", "email", "password", "confirm"])
    const [error, setError] = useState("")
    // Rajouter le state qui contiendra le token (token) et un state lié au User
    const [token, setToken] = useState(() => localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    // Rajouter un useEffect -> à chaque fois que la valeur de token (le payload) change on récupère celui-ci 
    // on le convertir depuis JSON et on crée un state avec le USer qui contient les infos liées au User dans le token 
    // Si on ne parvient pas à recup les infos, ou une erreur, on logout 

    // TODO : Décrypter le token avec JWT Decode, une dépendance à ajouter avec npm afin d'ajouter les infos de base de user au state
    useEffect(() => {
        if (token) {
            try {
                const payload = token.split('.')
                console.log(payload)
                setUser(payload)
            } catch(err) {
                // Il faudrait idéalement logout la personne
                console.log(err)
            }
        }
    }, [token]) 

    // Si on a bien un token valable dans notre state dans ce cas on veut retourner True dans une variable de 
    // type isAuthenticated sinon False. La valeur de cette variable nous ervira à déterminer si on autorise ou pas le user 
    // à accéder à une route protégée 

    // Création de la variable isAuthenticated qui contiendra un booléen -> Vrai si token, Faux sinon 
    // Ici l'utilisation de !! va changer la variable en booléen (ça va permettre d'afficher false pouyr les valeurs null, undefined et "")
    const isAuthenticated = !!token
    // const isAuthenticated = Boolean(token)

    // Fonction de logout réutilisable
    function logout() {
        setToken(null)
        localStorage.removeItem('token')
        redirect("/")
    }

    let AuthContextValues = {
        formData, setFormData,
        view, setView, 
        inputTypes, setInputTypes,
        error, setError, 
        token, setToken, 
        user, setUser, 
        isAuthenticated,
        logout
    }

    return <AuthContext.Provider value={AuthContextValues}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)