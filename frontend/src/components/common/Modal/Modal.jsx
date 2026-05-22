import { useEffect } from "react";

export default function Modal({ children, closeModal }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px", // Mobilde dış çerçevenin ekrana yapışmasını engeller
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Beyaz kutuya tıklayınca kapanmayı engeller
        style={{
          background: "white",
          width: "calc(100% - 40px)", // Mobilde ekran genişliğine göre esner, kenarlardan pay bırakır
          maxWidth: "500px", // Masaüstünde orijinal boyutu olan 500px'de sabit kalır
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", // Şık bir gölge kalıbı
        }}
      >
        {children}
      </div>
    </div>
  );
}
