import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import EjemploPagina from "./paginas/EjemploPagina";
import CamaraYolo from "./paginas/CamaraYolo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crud" element={<EjemploPagina />} />
        <Route path="/camara" element={<CamaraYolo />} />
      </Routes>
    </Router>
  );
}

export default App;
