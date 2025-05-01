"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/cartSlice";
import BuyNowButton from "./BuyNowButton";

const ProductDetail = ({ product }) => {
  if (!product) {
    return <div>Error: Producto no encontrado</div>;
  }

  const dispatch = useDispatch();
  const { id, name, price, old_price, images, description } = product;

  const precioEnEfectivo = price - price * 0.1;
  const formattedPrice = price.toLocaleString("es-AR", {
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
    ? Math.round(((old_price - price) / old_price) * 100)
    : null;

  const [selectedImage, setSelectedImage] = useState(
    images?.[0] || "/default-image.jpg"
  );

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
      const item = { id, name, price, images, description, selectedImage };
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
      <ToastContainer />
      <div className=" mx-auto  py-6 flex justify-center px-3 flex-col lg:flex-row gap-6 items-center lg:items-start">
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

          {discount && (
            <div className="text-green-600 font-semibold">
              <span className="text-xl">{discount}% OFF</span>
            </div>
          )}

          <div className="flex flex-col items-start">
            {old_price && (
              <p className="text-gray-500 line-through text-lg">{formattedOldPrice}</p>
            )}
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
    </div>
  );
};

export default ProductDetail;
