import { useEffect, useState } from "react";
import { obtenerEjemplos } from "../servicios/ejemploServicio";
import FormularioEjemplo from "../componentes/FormularioEjemplo";
import ListaEjemplos from "../componentes/ListaEjemplos";

export default function EjemploPagina() {
  const [ejemplos, setEjemplos] = useState([]);

  useEffect(() => {
    const cargarEjemplos = async () => {
      const datos = await obtenerEjemplos();
      setEjemplos(datos);
    };
    cargarEjemplos();
  }, []);

  const agregarEjemplo = (nuevo) => {
    setEjemplos([...ejemplos, nuevo]);
  };

  return (
    <div>
      <h1>CRUD de Ejemplo</h1>
      <FormularioEjemplo onAgregar={agregarEjemplo} />
      <ListaEjemplos ejemplos={ejemplos} setEjemplos={setEjemplos} />
    </div>
  );
}
