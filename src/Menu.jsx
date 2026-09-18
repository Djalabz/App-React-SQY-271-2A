// Import des pages / composants 
import Counter from "./Counter.jsx"
import Articles from "./Articles.jsx"
import Home from "./Home.jsx"
import Random from "./Random.jsx"

// Imports liés au routeur
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Menu() {
    return ( <>
        <BrowserRouter>
            {/* Navigation */}
            <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/random">Random</Link> |{" "}
            <Link to="/articles">Articles</Link> |{" "}
            <Link to="/counter">Counter</Link>
            </nav>

            {/* Routes */}
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/random" element={<Random />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/counter" element={<Counter />} />
            </Routes>

        </BrowserRouter>
    </> );
}

export default Menu;