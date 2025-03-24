"use client";
import { useState, useEffect } from "react";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ProductCardAdmin from "./ProductCardAdmin";
import { getProducts } from "../app/server/api";
import Loader from "./Loader";

const ProductListAdmin = () => {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

  const selectedCategory = searchParams.get("category") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000000;
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const initialSearchTerm = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(selectedCategory, sortOrder, minPrice, maxPrice, searchTerm);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory, sortOrder, minPrice, maxPrice, searchTerm]);

  // Función para manejar la búsqueda y actualizar la URL
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="justify-end  bg-zinc-900 py-2 xl:px-16 lg:px-16 xs:px-5">
      {/* Barra de búsqueda */}
      <div className="flex justify-center">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
        className="justify-center border p-2 rounded w-56 mb-4 text-black"
      />
        </div>
      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCardAdmin key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center">No se encontraron productos.</p>
      )}
    </div>
  );
};

export default ProductListAdmin;
