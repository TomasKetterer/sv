import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [noPos, setNoPos] = useState({ top: 65, left: 55 });
  const [yesSize, setYesSize] = useState(1);
  const [accepted, setAccepted] = useState(false);

  // El Sí crece con el tiempo 😈
  useEffect(() => {
    const interval = setInterval(() => {
      setYesSize((s) => Math.min(s + 0.05, 3));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const moveNo = () => {
    const top = Math.random() * 70 + 10;
    const left = Math.random() * 70 + 10;
    setNoPos({ top, left });
    setYesSize((s) => Math.min(s + 0.1, 3));
  };

  const sayYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 220,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <div style={styles.container}>
      {/* Corazones flotando */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>💖</span>
        ))}
      </div>

      {!accepted ? (
        <>
          <h1 style={styles.title}>¿Quieres ser mi San Valentín? 💘</h1>

          <button
            onClick={sayYes}
            style={{
              ...styles.yes,
              transform: `scale(${yesSize})`,
            }}
          >
            Sí ❤️
          </button>

          <button
            onMouseEnter={moveNo}
            onClick={moveNo}
            onTouchStart={moveNo}
            style={{
              ...styles.no,
              top: `${noPos.top}%`,
              left: `${noPos.left}%`,
            }}
          >
            No 💔
          </button>
        </>
      ) : (
        <>
          <h1 style={styles.final}>
            💕 ¡Es una cita! 💕 <br />
            Nos vemos el 14
          </h1>

          <img
            src="/foto.webp"
            alt="Nosotros"
            style={styles.photo}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "2.3rem",
    marginBottom: "30px",
    color: "#fff",
    textAlign: "center",
    textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
  },
  yes: {
    fontSize: "1.4rem",
    padding: "14px 40px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#ff4d6d",
    color: "white",
    marginBottom: "20px",
    transition: "transform 0.3s",
    zIndex: 2,
  },
  no: {
    position: "absolute",
    padding: "12px 25px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#444",
    color: "white",
    transition: "top 0.2s, left 0.2s",
    zIndex: 2,
  },
  final: {
    color: "white",
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "25px",
    textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
  },
  photo: {
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  },
};
