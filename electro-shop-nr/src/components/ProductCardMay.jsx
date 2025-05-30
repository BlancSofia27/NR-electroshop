
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ProductCardM = ({ product }) => {
  const [hoveredImages, setHoveredImages] = useState({}); // Estado para manejar imágenes en hover

  const firstImage = product.images?.[0] || product.image; // Imagen principal
  const secondImage = product.images?.[1] || firstImage; // Imagen alternativa en hover

  // Formatear el precio con puntos y coma y dos decimales para Argentina
  const formattedPrice = product.may_price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const precioEnEfectivo = product.may_price - (product.may_price * 0.10);
  const formattedPrecioEnEfectivo = precioEnEfectivo.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Link href={`mayoristas/${product.id}`} passHref>
    <div 
      key={product.id} 
      className="bg-white mx-2  xs:w-[150px] xs:h-[350px] sm:w-[200px] sm:h-[385px] md:w-[180px] md:h-[370px]   lg:w-[200px] lg:h-[370px]  xl:w-[220px] xl:h-[450px] flex flex-col justify-between relative shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
    >
      <div className="relative">
        Cartel de Envío Gratis
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
          className="w-full sm:h-48   md:h-44 lg:h-48 xl:h-52 xs:h-36 object-cover transition-opacity duration-300"
          onMouseEnter={() => setHoveredImages((prev) => ({ ...prev, [product.id]: secondImage }))}
          onMouseLeave={() => setHoveredImages((prev) => ({ ...prev, [product.id]: firstImage }))}
        />
      </div>

       {/* Información de producto */}
       <div className="xl:p-4 xs:p-1 flex flex-col justify-start flex-grow text-sm font-sans text-gray-500">
        <h3 className=" xl:mt-2  xs:text-md sm:text-base sm:leading-none  xl:text-lg xl:leading-none xs:leading-none xs:h-16 sm:h-16 lg:h-12 xl:h-20">{product.name}</h3>
       
        {/* {product.old_price? (
        <p className=" line-through  h-6 text-lg">${product.old_price}</p>
        ) : <p   className=" h-6"></p> } */}
        <p className=" font-semibold text-lg">{formattedPrice}</p> {/* Mostrar precio formateado */}
        <p className=" text-sm xs:leading-none">{formattedPrecioEnEfectivo} con efectivo o transferencia.</p>
        <button className="mt-1 bg-black text-white px-4 py-2 hover:bg-zinc-600 transition-colors duration-300 w-full">
          Comprar
        </button>
        </div>
    </div>
    </Link>
  );
};

export default ProductCardM;
