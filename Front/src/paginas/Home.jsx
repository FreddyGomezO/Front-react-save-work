import React from "react";
import { useNavigate } from "react-router-dom";
//import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🧠 SaveWorkIA</h1>
      <p className="home-subtitle">
        Plataforma inteligente para la detección de EPP y gestión de datos.
      </p>

      <div className="home-buttons">
        <button className="btn crud" onClick={() => navigate("/crud")}>
          🧾 Ir al CRUD
        </button>
        <button className="btn camara" onClick={() => navigate("/camara")}>
          🎥 Cámara YOLOv8
        </button>
      </div>
    </div>
  );
};

export default Home;
