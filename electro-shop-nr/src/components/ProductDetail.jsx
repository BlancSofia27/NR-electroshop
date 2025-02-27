'use client';
import { useState } from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js para las imágenes

const ProductDetail = ({ product }) => {

  if (!product) {
    return <div>Error: Producto no encontrado</div>;
  }

  // Desestructuración de datos del producto
  const { name, price, old_price, images, description } = product;

    
  const precioEnEfectivo = product.price - (product.price * 0.10);
  const formattedPrecioEnEfectivo = precioEnEfectivo.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  

  // Formateo del precio
  const formattedPrice = price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedOldPrice = old_price?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const discount = old_price
    ? Math.round(((old_price - price) / old_price) * 100)
    : null;

  // Estado para la imagen principal
  const [selectedImage, setSelectedImage] = useState(images?.[0] || '/default-image.jpg');

  // Función para cambiar la imagen principal al hacer clic en una miniatura
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  // Lógica para procesar la descripción y agregar saltos de línea en cada guion
  const formattedDescription = description.split('-').map((part, index) => (
    <p key={index} className="text-gray-600 text-lg my-2">
      {part.trim()}
    </p>
  ));

  return (
    <div className="container mx-auto px-8 py-6 flex flex-col gap-6 items-center justify-center">
      <div className="container mx-auto px-8 py-6 flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* Galería de imágenes */}
        <div className="w-auto flex flex-col gap-4 items-center">
          {/* Miniaturas de imágenes */}
          <div className="flex flex-col gap-2 h-auto">
            {images?.map((img, index) => (
              <div
                key={index}
                onClick={() => handleThumbnailClick(img)} // Cambiar la imagen principal al hacer clic
                className="cursor-pointer border rounded-lg hover:opacity-80 w-20 h-20"
              >
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Imagen principal */}
        <div className="w-full lg:w-2/5 flex justify-center">
          <div className="relative">
            {product.free_shipping && (
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                Envío Gratis
              </div>
            )}
            <Image
              src={selectedImage}
              alt={name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="w-full lg:w-2/5 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>

          {discount && (
            <div className="text-green-600 font-semibold">
              <span className="text-xl">{discount}% OFF</span>
            </div>
          )}

          <div className="flex flex-col items-start ">
            {old_price && (
              <p className="text-gray-500 line-through text-lg">{formattedOldPrice}</p>
            )}
            <p className="text-3xl font-bold text-zinc-900">{formattedPrice}</p>
            <p className="text-gray-500 text-lg">{formattedPrecioEnEfectivo} con efectivo o transferencia.</p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 mt-4">
            <button className="w-1/2 bg-black text-white font-semibold py-3  hover:bg-zinc-700 transition">
              Comprar ahora
            </button>
            <button className="w-1/2 bg-black text-white font-semibold py-3  hover:bg-zinc-700 transition">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
      <div className="p-10">
        {/* Mostrar la descripción procesada con saltos de línea */}
        <div className="text-gray-600 text-2xl leading-relaxed">
          {formattedDescription}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
