import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [hoveredImages, setHoveredImages] = useState({}); // Estado para manejar imágenes en hover

  const firstImage = product.images?.[0] || product.image; // Imagen principal
  const secondImage = product.images?.[1] || firstImage; // Imagen alternativa en hover

  // Formatear el precio con puntos y coma y dos decimales para Argentina
  const formattedPrice = product.price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const precioEnEfectivo = product.price - (product.price * 0.10);
  const formattedPrecioEnEfectivo = precioEnEfectivo.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Link href={`/products/${product.id}`} passHref>
    <div 
      key={product.id} 
      className="bg-white w-[220px] mx-2 h-[450px] flex flex-col justify-between relative shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <div className="relative">
        {/* Cartel de Envío Gratis */}
        {product.free_shipping && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-base bg-opacity-75 px-2   rounded-sm">
            Envío Gratis
          </div>
        )}

        {/* Imagen con efecto hover */}
        <Image
          src={hoveredImages[product.id] || firstImage}
          alt={product.name}
          height={200}
          width={200}
          className="w-full h-52 object-cover transition-opacity duration-300"
          onMouseEnter={() => setHoveredImages((prev) => ({ ...prev, [product.id]: secondImage }))}
          onMouseLeave={() => setHoveredImages((prev) => ({ ...prev, [product.id]: firstImage }))}
        />
      </div>

       {/* Información de producto */}
       <div className="p-4 flex flex-col justify-end flex-grow text-sm font-sans">
        <h3 className="  h-20 text-gray-600 font-medium">{product.name}</h3>
        <h3 className="mt-2 text-gray-500 text-xs">{product.title}</h3>
        {product.old_price? (
        <p className="text-gray-500 line-through text-sm">${product.old_price}</p>
        ) : <p className=" h-6"></p> }
        <p className=" font-semibold text-lg">{formattedPrice}</p> {/* Mostrar precio formateado */}
        <p className="text-gray-500 text-sm">{formattedPrecioEnEfectivo} con efectivo o transferencia.</p>
        <button className="mt-1 bg-black text-white px-4 py-2 hover:bg-zinc-600 transition-colors duration-300 w-full">
          Comprar
        </button>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
