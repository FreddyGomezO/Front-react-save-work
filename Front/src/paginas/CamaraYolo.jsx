import React, { useRef, useEffect, useState } from "react";

const CamaraYolo = () => {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Encender la cámara
  const iniciarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
      alert("No se pudo acceder a la cámara. Verifica permisos o conexión.");
    }
  };

  // Detener la cámara (versión segura)
  const detenerCamara = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Detectar persona enviando el frame al backend
  const detectarPersona = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await fetch("http://127.0.0.1:8000/yolo/detectar", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log("Objetos detectados:", data);
        alert(`Detectados: ${data.cantidad} persona(s)`);
      } catch (err) {
        console.error(err);
        alert("Error al detectar persona");
      }
    }, "image/jpeg");
  };

  // Detener cámara al desmontar el componente
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        detenerCamara();
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎥 Cámara YOLOv8</h1>

      <div style={styles.videoContainer}>
        <video ref={videoRef} autoPlay playsInline style={styles.video} />
      </div>

      <div style={styles.buttons}>
        {!isCameraActive ? (
          <button onClick={iniciarCamara} style={styles.startBtn}>
            Encender cámara
          </button>
        ) : (
          <>
            <button onClick={detenerCamara} style={styles.stopBtn}>
              Apagar cámara
            </button>
            <button onClick={detectarPersona} style={styles.detectBtn}>
              Detectar persona
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Estilos limpios y profesionales
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
  },
  videoContainer: {
    width: "640px",
    height: "480px",
    border: "2px solid #ccc",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    transform: "scaleX(-1)",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  startBtn: {
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  stopBtn: {
    padding: "10px 20px",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  detectBtn: {
    padding: "10px 20px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CamaraYolo;
