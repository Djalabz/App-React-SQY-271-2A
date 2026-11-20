// Imports de composants 
import Menu from "./Menu.jsx"

// Import du ShopContext Provider 
import { ShopContextProvider } from "./context/ShopContext.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

// TODO GLOBALE : 

// 1 - Recup les infos du user en traduisant le token JWT dans le authContext 
// Ceci afin d'avoir accès au nom, email du user en cours partout dans l'application 

// 2 - Faire une nouvelle page qui viendra accueillir un chat / messagerie instantanée
// On pourra avoir une icone de type bulle BD dans la navbar 

// 3 - Améliorer l'affichage des commentaires sur la page produit qui n'est pas très ésthétique
// Mettre les dates de commentaires au meme format  

function App() {
  return (
    <>
      <AuthProvider><ShopContextProvider><Menu /></ShopContextProvider></AuthProvider>
    </>
  )
}

export default App
