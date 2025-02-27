"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../app/server/api"; // Asegúrate de importar correctamente la función
import ProductCard from "./ProductCard"; // Asegúrate de importar ProductCard correctamente

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
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} className="w-full max-w-[250px] h-full" />
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
};

export default ProductList;
