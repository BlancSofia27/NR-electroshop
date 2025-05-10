"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/cartMaySlice";
import BuyNowButton from "./BuyNowButton";
import { Carousel } from "react-responsive-carousel";

const ProductDetailMay = ({ product }) => {
  if (!product) {
    return <div>Error: Producto no encontrado</div>;
  }

  const dispatch = useDispatch();
  const { id, name, may_price, images, description } = product;

  const formattedPrice = may_price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [selectedImage, setSelectedImage] = useState(
    images?.[0] || "/default-image.jpg"
  );

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const formattedDescription = description.split("-").map((part, index) => (
    <p key={index} className="text-gray-600 text-lg my-2">{part.trim()}</p>
  ));

  const handleAddToCart = () => {
    const item = { id, name, may_price, images, description, selectedImage };
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
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        style: {
          backgroundColor: "#1E1E1E",
          color: "#ffffff",
          borderRadius: "10px",
          padding: "10px",
        },
        icon: "🛒",
      }
    );
  };

  return (
    <div className=" flex justify-center items-center pt-10">
   
    <div className="mx-auto  py-6 flex justify-center px-3 flex-col lg:flex-row gap-6 items-center lg:items-start">
      {/* Galería de imágenes */}
      <div className="w-full lg:w-2/5 flex flex-col lg:flex-row gap-4">
        {/* Miniaturas en XS y SM (debajo) */}

        {/* Miniaturas en MD, LG y XL (izquierda) */}
        <div className="hidden lg:flex flex-col gap-2 mr-4">
          {images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              width={80}
              height={80}
              className={`cursor-pointer rounded-md border-2 ${
                selectedImage === img ? "border-black" : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(img)}
            />
          ))}
        </div>

        {/* Imagen principal */}
        <div className="w-full flex justify-center">
          <Image
            src={selectedImage}
            alt={name}
            width={500}
            height={500}
            className="object-cover rounded-lg"
          />
        </div>
      </div>

        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
          {images?.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Miniatura ${index + 1}`}
              width={60}
              height={60}
              className={`cursor-pointer rounded-md border-2 ${
                selectedImage === img ? "border-black" : "border-transparent"
              }`}
              onClick={() => handleThumbnailClick(img)}
            />
          ))}
        </div>
      {/* Información del producto */}
      <div className="w-full lg:w-2/5 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>

       

        <div className="flex flex-col items-start">
          <p className="text-3xl font-bold text-zinc-900">{formattedPrice}</p>
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

        {/* Descripción */}
        <div className="xl:p-5 lg:p-5">
          <div className="text-gray-600 text-2xl leading-relaxed">
            {description.split("-").map((part, index) => (
              <p key={index} className="text-gray-600 text-lg my-2">{part.trim()}</p>
            ))}
          </div>
        </div>
      </div>

    </div>
    <ToastContainer />
  </div>
  );
};

export default ProductDetailMay;
