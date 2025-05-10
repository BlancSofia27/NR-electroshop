"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCardAdmin from "./ProductCardAdmin";
import { getProducts } from "../app/server/api";
import Loader from "./Loader";
import { categories } from "@/constants/categoriesApi";
const ProductListAdmin = () => {
  const searchParams = useSearchParams();
  
  // Obtener los parámetros de la URL y establecer valores por defecto
  const initialSearchTerm = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialMinPrice = Number(searchParams.get("minPrice")) || 0;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || Infinity;
  const initialSortOrder = searchParams.get("sortOrder") || "asc";

  // Estados locales para almacenar los productos y los filtros
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await getProducts(category, sortOrder, minPrice, maxPrice, searchTerm);
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, [category, sortOrder, minPrice, maxPrice, searchTerm]);

  // Función para manejar la búsqueda y actualizar la URL
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    updateUrlParams("search", term);
  };

  // Función para manejar la categoría y actualizar la URL
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    updateUrlParams("category", selectedCategory);
  };

  // Función para manejar el precio mínimo y actualizar la URL
  const handleMinPriceChange = (e) => {
    const price = Number(e.target.value);
    setMinPrice(price);
    updateUrlParams("minPrice", price);
  };

  // Función para manejar el precio máximo y actualizar la URL
  const handleMaxPriceChange = (e) => {
    const price = Number(e.target.value);
    setMaxPrice(price);
    updateUrlParams("maxPrice", price);
  };

  // Función para manejar el orden de los precios y actualizar la URL
  const handleSortOrderChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    updateUrlParams("sortOrder", order);
  };

  // Función para actualizar los parámetros de la URL sin recargar la página
  const updateUrlParams = (key, value) => {
    const currentUrl = new URL(window.location.href);
    if (value) {
      currentUrl.searchParams.set(key, value);
    } else {
      currentUrl.searchParams.delete(key);
    }
    window.history.pushState({}, "", currentUrl.toString());
  };

  return (
    <div className="justify-end bg-zinc-900 py-2 xl:px-16 lg:px-16 xs:px-5">
      {/* Filtros */}
      <div className="flex flex-col space-y-4 mb-4 text-zinc-900">
        <div className="flex justify-center">
          <label htmlFor="search" className="text-zinc-900">Buscar productos:</label>
          <input
            type="text"
            id="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearch}
            className="justify-center border p-2 rounded  text-black"
          />
        </div>

        <div className="flex justify-center space-x-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="text-white">Categoría:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="border p-2 rounded "
            >
              <option value="">Todas las categorías</option>
              {/* Agrega las opciones de categorías disponibles aquí */}
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="minPrice" className="text-white">Precio Mínimo:</label>
            <input
              type="number"
              id="minPrice"
              placeholder="Precio Mínimo"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border p-2 rounded  text-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="maxPrice" className="text-white">Precio Máximo:</label>
            <input
              type="number"
              id="maxPrice"
              placeholder="Precio Máximo"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="border p-2 rounded  text-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="sortOrder" className="text-white">Ordenar por precio:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortOrderChange}
              className="border p-2 rounded "
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
