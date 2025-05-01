import { useSelector } from "react-redux";

const ResumeButtonMay = () => {
  const cartItems = useSelector((state) => state.cartMay.items);

  

  // Función para generar el mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    if (!cartItems || cartItems.length === 0) {
      return encodeURIComponent("El carrito está vacío.");
    }

    // Generar la lista de productos con validación
    const productDetails = cartItems.map((item) => {
      const price = item.may_price ? item.may_price * item.quantity : 0;
      return `${item.quantity}x ${item.name} - $${price.toFixed(2)}`;
    });

    // Calcular el total validando valores inválidos
    const total = cartItems.reduce(
      (sum, item) => sum + (item.may_price ? item.may_price * item.quantity : 0),
      0
    );

    // Crear el mensaje completo
    const message = `¡Hola! Quiero hacer un pedido. Aquí están los productos en mi carrito:\n\n${productDetails.join(
      "\n"
    )}\n\nTotal: $${total.toFixed(2)}`;

    return encodeURIComponent(message);
  };

  // Crear el enlace de WhatsApp
  const whatsappLink = `https://wa.me/541127484410?text=${generateWhatsAppMessage()}`;

  return (
    <div className="flex justify-center">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-2 bg-black text-white font-semibold py-3 px-6 hover:bg-zinc-700 transition"
      >
        Finalizar Compra
      </a>
    </div>
  );
};

export default ResumeButtonMay;
