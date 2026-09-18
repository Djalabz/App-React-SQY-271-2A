// Import des pages / composants 
import Counter from "./Counter.jsx"
import Articles from "./Articles.jsx"
import Home from "./Home.jsx"
import Random from "./Random.jsx"
import Quiz from "./Quiz.jsx"
import Api from "./Api.jsx"
import Form from "./Form.jsx"

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
                <Link to="/counter">Counter</Link> |{" "}
                <Link to="/api">Api</Link> |{" "}
                <Link to="/form">Form</Link> |{" "}
                <Link to="/quiz">Quiz</Link>
            </nav>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random" element={<Random />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/form" element={<Form />} />
                <Route path="/api" element={<Api />} />
            </Routes>
        </BrowserRouter>
    </> );
}

export default Menu;