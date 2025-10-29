const URL_BASE = "http://127.0.0.1:8000/ejemplos/";

// Obtener todos los ejemplos
export async function obtenerEjemplos() {
  const respuesta = await fetch(URL_BASE);
  return respuesta.json();
}

// Crear un ejemplo
export async function crearEjemplo(datos) {
  const respuesta = await fetch(URL_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });
  return respuesta.json();
}

// Eliminar un ejemplo
export async function eliminarEjemplo(id) {
  const respuesta = await fetch(`${URL_BASE}${id}`, {
    method: "DELETE",
  });
  return respuesta.json();
}
