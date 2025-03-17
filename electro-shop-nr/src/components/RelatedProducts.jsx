"use client";
import { useEffect, useState } from "react";
import { getRandomProductsByCategory } from "../../src/app/server/api"; // Ajusta la ruta según tu estructura
import ProductCard from "./ProductCard";

const RelatedProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const relatedProducts = await getRandomProductsByCategory(category);
      setProducts(relatedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="my-10 text-zinc-800 xl:mx-8 lg:mx-8">
      <h2 className="text-2xl  mb-4 px-2">Productos Relacionados</h2>

      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos relacionados.</p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {products.map((product) => (
            <div  key={product.id} className="flex justify-center items-center">
            <ProductCard   product={product}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
