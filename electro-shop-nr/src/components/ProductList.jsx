"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../app/server/api"; // Asegúrate de importar correctamente la función

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-6 px-5 gap-2 justify-items-center">
        {products.map((product) => (
          <div key={product.id} className="bg-white w-52 flex flex-col justify-between relative shadow-lg rounded-md">
            <div className="relative">
              {/* Texto encima de la imagen */}
              <h3 className="bg-amber-300 text-white py-1 px-3 text-sm absolute top-[100px] left-0 transform -rotate-90 origin-top-left z-10">
                Envío Gratis
              </h3>
              <img src={product.image} alt={product.title} className="w-full h-52 object-cover rounded-md" />
            </div>

            {/* Información de producto */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-xl font-bold mt-2">${product.price}</p>
              <button className="mt-3 bg-black text-white px-4 py-2 hover:bg-zinc-600 transition-colors duration-300">
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
