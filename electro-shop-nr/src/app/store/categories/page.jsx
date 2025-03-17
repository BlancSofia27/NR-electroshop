"use client";
import React from 'react';
import { useRouter } from 'next/navigation';  // Cambié esto
import { categories } from '../../../constants/categoriesApi'; // Importa las categorías

const CategoryPage = () => {
  const router = useRouter();

  // Función para manejar el clic en la categoría
  const handleCategoryClick = (category) => {
    router.push(`products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="container mx-auto my-16 p-6 text-zinc-700">
      <h1 className="text-4xl font-bold mb-6 text-center">Categorías</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition"
            onClick={() => handleCategoryClick(name)}
          >
            <Icon size={30} /> {/* Renderiza el componente icono */}
            <span className="mt-2 text-sm font-medium">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
