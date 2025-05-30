"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/cartMSlice";
import BuyNowButton from "./BuyNowButton";
import { Carousel } from "react-responsive-carousel";
const ProductDetailM = ({ product }) => {
  if (!product) {
    return <div>Error: Producto no encontrado</div>;
  }

  const dispatch = useDispatch();
  const { id, name, may_price, old_price, images, description } = product;

  const precioEnEfectivo = may_price - may_price * 0.1;
  const formattedPrice = may_price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedPrecioEnEfectivo = precioEnEfectivo.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formattedOldPrice = old_price?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const discount = old_price
    ? Math.round(((old_price - may_price) / old_price) * 100)
    : null;

  const [selectedImage, setSelectedImage] = useState(
    images?.[0] || "/default-image.jpg"
  );

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const formattedDescription = description.split("-").map((part, index) => (
    <p key={index} className="text-gray-600 text-lg my-2">{part.trim()}</p>
  ));

  // Función para agregar al carrito con Toastify
  const handleAddToCart = () => {
    const item = { id, name, may_price, old_price, images, description, selectedImage };
    dispatch(addToCart(item));

    toast.success(
      <div className="flex items-center gap-4">
        <img
          src={selectedImage}
          alt={name}
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-gray-300">{formattedPrice}</p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        style: {
          backgroundColor: "#1E1E1E", // Fondo oscuro personalizado
          color: "#ffffff", // Texto blanco
          borderRadius: "10px",
          padding: "10px",
        },
        icon: "🛒",
      }
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="container xs:mt-[130px] mx-auto xl:px-8 xl:py-6 lg:px-8 lg:py-6 flex flex-col gap-6 items-center justify-center">
        <div className="container mx-auto xl:px-8 xl:py-6 lg:px-8 lg:py-6 flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Galería de imágenes */}
          <div className="w-full lg:w-2/5 flex justify-center">
            {/* Carrusel para pantallas pequeñas y medianas */}
            <Carousel
              showArrows={true}
              autoPlay={false}
              infiniteLoop={true}
              swipeable={true}
              dynamicHeight={true}
              showThumbs={false} // Escondido en pantallas grandes
              className="lg:hidden" // Escondido en pantallas grandes
            >
              {images?.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`Imagen ${index + 1}`} />
                </div>
              ))}
            </Carousel>

            {/* Imagen principal para pantallas grandes */}
            <div className="hidden lg:block">
              <img
                src={images?.[0] || "/default-image.jpg"}
                alt={name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>

            {/* {discount && (
              <div className="text-green-600 font-semibold">
                <span className="text-xl">{discount}% OFF</span>
              </div>
            )} */}

            <div className="flex flex-col items-start">
              
              <p className="text-3xl font-bold text-zinc-900">{formattedPrice}</p>
              <p className="text-gray-500 text-lg">
                {formattedPrecioEnEfectivo} con efectivo o transferencia.
              </p>
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-4">
              <BuyNowButton />
              <button
                onClick={handleAddToCart}
                className="w-1/2 bg-black text-white font-semibold py-3 hover:bg-zinc-700 transition"
              >
                Agregar al carrito
              </button>
            </div>

            {/* Descripción del producto */}
            <div className="xl:p-5 lg:p-5">
              <div className="text-gray-600 text-2xl leading-relaxed">
                {formattedDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailM;
