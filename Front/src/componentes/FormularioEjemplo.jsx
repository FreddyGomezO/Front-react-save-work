import { useState } from "react";
import { crearEjemplo } from "../servicios/ejemploServicio";

export default function FormularioEjemplo({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const nuevo = await crearEjemplo({ nombre, descripcion });
    onAgregar(nuevo); // refresca lista en la página
    setNombre("");
    setDescripcion("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <button type="submit">Agregar Ejemplo</button>
    </form>
  );
}
