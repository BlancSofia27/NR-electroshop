"use client";
import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../redux/cartSlice";
import BuyNowButton from "./BuyNowButton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "./Loader";

const ProductDetail = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  if (!product) {
    return <div>Error: Producto no encontrado</div>;
  }

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
    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const formattedDescription = description
    .split("-")
    .map((part, index) => (
      <p key={index} className="text-gray-600 text-lg my-2">
        {part.trim()}
      </p>
    ));

  // Agregar al carrito con Toastify
  const handleAddToCart = () => {
    const item = { id, name, price, old_price, images, description, selectedImage };
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
    <>
      <ToastContainer />
      <div className="container xs:mt-[130px] mx-auto flex flex-col gap-6 items-center justify-center">
        <div className="container mx-auto flex flex-col md:flex-row gap-6 items-center justify-center">
          {/* Galería de imágenes en md, lg, xl */}
          <div className="hidden md:flex w-full lg:w-2/5 flex-col lg:flex-row items-center">
            {/* Miniaturas */}
            <div className="hidden lg:flex flex-col gap-2 w-1/5 m-4">
              {images?.map((img, index) => (
                <button
                  key={index}
                  className="rounded-lg focus:outline-none transform transition-transform duration-200 hover:scale-105"
                  onClick={() => handleThumbnailClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover rounded-md"
                    width={100}
                    height={100}
                  />
                </button>
              ))}
            </div>

            {/* Imagen principal */}
            <div className="w-full lg:w-4/5 relative">
              {isLoading && (
                <div className="absolute inset-0 flex justify-center items-center bg-white">
                  <Loader />
                </div>
              )}
              <Image
                src={selectedImage}
                alt={name}
                className="object-cover rounded-lg"
                width={400}
                height={400}
                onLoad={handleImageLoad}
              />
            </div>
            
          </div>
          
          {/* Carrusel en xs y sm */}
          <div className="md:hidden">
            <Carousel
              showArrows={true}
              autoPlay={false}
              infiniteLoop={true}
              swipeable={true}
              dynamicHeight={true}
              showThumbs={false}
              height="330px"
            >
              {images?.map((img, index) => (
                <div key={index}>
                  {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white">
                      <Loader />
                    </div>
                  )}
                  <Image 
                    src={img} 
                    alt={`Imagen ${index + 1}`} 
                    width={330} 
                    height={330} 
                    onLoad={handleImageLoad} 
                  />
                </div>
              ))}
            </Carousel>
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
                <p className="text-gray-500 line-through text-lg">
                  {formattedOldPrice}
                </p>
              )}
              <p className="text-3xl font-bold text-zinc-900">
                {formattedPrice}
              </p>
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

export default ProductDetail;
