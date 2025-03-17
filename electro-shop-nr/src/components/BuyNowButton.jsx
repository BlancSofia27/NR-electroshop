import React from "react";

const BuyNowButton = () => {
  // Obtener la URL actual de la página
  const currentUrl = window.location.href;

  // Número de WhatsApp al que enviar el mensaje
  const whatsappNumber = "541127484410"; // Reemplaza con el número de WhatsApp deseado

  // Generar mensaje para WhatsApp
  const handleBuyNow = () => {
    const message = `¡Hola! Estoy interesado en comprar este producto: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Abrir el enlace de WhatsApp en una nueva pestaña
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button 
      onClick={handleBuyNow}
      className="w-1/2 bg-black text-white font-semibold py-3 hover:bg-zinc-700 transition"
    >
      Comprar ahora
    </button>
  );
};

export default BuyNowButton;
