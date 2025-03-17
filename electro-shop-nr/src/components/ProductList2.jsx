"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { getProducts } from "../app/server/api";
import Loader from "./Loader";

const ProductList2 = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(selectedCategory, sortOrder, minPrice, maxPrice);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, sortOrder, minPrice, maxPrice]);

  return (
    <div className="container py-2">
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductList2;
