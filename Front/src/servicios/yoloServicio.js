// src/servicios/yoloServicio.js
const API_URL = "http://127.0.0.1:8000/yolo/detectar"; // endpoint del backend

export const detectarConYolo = async (imagenFile) => {
  const formData = new FormData();
  formData.append("file", imagenFile);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al detectar objetos con YOLOv8");
    }

    const data = await response.json();
    return data.detecciones;
  } catch (error) {
    console.error("Error en YOLO servicio:", error);
    throw error;
  }
};
