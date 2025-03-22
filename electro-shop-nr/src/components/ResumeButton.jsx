// src/components/ButtonResume.jsx
import { useSelector } from "react-redux";

const ResumeButton = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Función para generar el mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (cartItems.length === 0) {
      return "El carrito está vacío.";
    }

    // Generar una lista con los productos y sus cantidades
    const productDetails = cartItems.map((item) => {
      return `${item.quantity}x ${item.name} - $${item.price * item.quantity}`;
    });

    // Crear un mensaje completo para WhatsApp
    const message = `¡Hola! Quiero hacer un pedido. Aquí están los productos en mi carrito:\n\n${productDetails.join(
      "\n"
    )}\n\nTotal: $${cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )}`;

    // Retornar el mensaje de WhatsApp codificado para la URL
    return encodeURIComponent(message);
  };

  // Crear el enlace de WhatsApp
  const whatsappLink = `https://wa.me/541127484410?text=${generateWhatsAppMessage()}`;

  return (
    <div className="flex justify-center">
      <a
        href="/store/checkout"
        target="_blank"
        rel="noopener noreferrer"
        className=" mx-2 bg-black text-white font-semibold py-3 px-6 hover:bg-zinc-700 transition"
      >
       Finalizar Compra
      </a>
    </div>
  );
};

export default ResumeButton;
