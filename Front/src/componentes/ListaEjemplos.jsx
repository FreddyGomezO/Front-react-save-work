import { eliminarEjemplo } from "../servicios/ejemploServicio";

export default function ListaEjemplos({ ejemplos, setEjemplos }) {
  const manejarEliminar = async (id) => {
    await eliminarEjemplo(id);
    setEjemplos(ejemplos.filter((e) => e.id !== id));
  };

  return (
    <ul>
      {ejemplos.map((e) => (
        <li key={e.id}>
          <strong>{e.nombre}</strong> - {e.descripcion}
          <button onClick={() => manejarEliminar(e.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
}
