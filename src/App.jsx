import Counter from "./Counter.jsx"
import Articles from "./Articles.jsx"
import Home from "./Home.jsx"
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {

  let name = "Tom"

  return (
    <>
      <BrowserRouter>
        {/* Navigation */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/articles">Articles</Link> |{" "}
          <Link to="/counter">Counter</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
