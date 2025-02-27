'use client';
import React, { useState, useEffect } from "react";
import SideBarProducts from "../../components/SideBarProducts"; // Asegúrate de importar el SideBarProducts correctamente
import ProductList2 from "../../components/ProductList2"; // Este es el componente donde mostrarás cada producto
import { getProducts } from "../server/api"; // Asegúrate de importar correctamente tu función getProducts


const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Por defecto, sin categoría
  const [sortOrder, setSortOrder] = useState("asc");

  // Categorías para el filtro de la SideBarProducts
  const categories = ["Accesorios", "Parlantes", "Audio", "Entretenimiento", "Hogar"];

  useEffect(() => {
    // Obtener los productos de la API
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(); // Llamada a tu API para obtener los productos

        // Filtrar por categoría solo si se selecciona alguna, sino mostramos todos
        const filteredProducts = selectedCategory
          ? fetchedProducts.filter(product => product.category === selectedCategory)
          : fetchedProducts; // Aquí mostramos todos los productos si no hay categoría seleccionada

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Solo se vuelve a ejecutar cuando cambia la categoría seleccionada

  // Ordenar productos por precio
  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
  }, [sortOrder]); // Ordenar siempre que cambie el precio o el sortOrder

  return (
    <div className="flex mx-6">
      {/* SideBarProducts */}
      <SideBarProducts
        categories={categories}
        selectedCategory={selectedCategory}
        setCategory={setSelectedCategory}
        setSortOrder={setSortOrder}
      />

      {/* Contenedor de productos */}
      <div className="w-full mt-3">
        <ProductList2 products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
