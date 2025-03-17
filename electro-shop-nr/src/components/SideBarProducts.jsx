"use client";
import React, { useState } from "react";
import { categories } from "../constants/categoriesApi";

const SideBarProducts = ({ selectedCategory, setCategory, setSortOrder, setPriceRange }) => {
  const [localMinPrice, setLocalMinPrice] = useState(0);
  const [localMaxPrice, setLocalMaxPrice] = useState(1000000);

  return (
    <div className=" text-zinc-800 w-64 p-4 m-auto bg-white   h-full  overflow-y-auto">
      {/* Selector de categorías */}
      <h3 className="text-lg font-semibold mb-2">Categoría</h3>
      <select
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={selectedCategory || "Todas"}
        onChange={(e) => setCategory(e.target.value === "Todas" ? "" : e.target.value)}
      >
        <option value="Todas">Todas las categorías</option>
        {categories.map(({ name }) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>

      {/* Orden de clasificación */}
      <h3 className="text-lg font-semibold mb-2">Ordenar por</h3>
      <select
        onChange={(e) => setSortOrder(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
      >
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>

      {/* Rango de precios */}
      <h3 className="text-lg font-semibold mb-2">Rango de precio</h3>
      <div className="flex flex-col">
        <input
          type="number"
          value={localMinPrice}
          onChange={(e) => setLocalMinPrice(e.target.value)}
          className="border p-2 mb-2"
          placeholder="Precio mínimo"
        />
        <input
          type="number"
          value={localMaxPrice}
          onChange={(e) => setLocalMaxPrice(e.target.value)}
          className="border p-2"
          placeholder="Precio máximo"
        />
      </div>

      {/* Botón de aplicar filtro */}
      <button
        onClick={() => setPriceRange(localMinPrice, localMaxPrice)}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Aplicar Filtro
      </button>

      {/* Botón de limpiar filtros */}
      <button
        className="mt-2 w-full bg-gray-300 py-2 rounded-lg"
        onClick={() => {
          setCategory("");
          setPriceRange(0, 1000000);
          setSortOrder("asc");
        }}
      >
        Limpiar Filtros
      </button>
    </div>
  );
};

export default SideBarProducts;