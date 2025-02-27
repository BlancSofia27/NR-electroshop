import React from "react";

const SideBarProducts = ({ categories, selectedCategory, setCategory, setSortOrder }) => {
  return (
    <div className="h-full w-1/4 bg-white  p-4 overflow-y-auto ">
      <h1 className="text-3xl font-semibold mb-4">Productos</h1>

      {/* Botón para mostrar todas las categorías */}
      <button
        className={`w-full p-2 mb-2 rounded ${
          selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => setCategory("")}
      >
        Todas las Categorías
      </button>

      {/* Lista de categorías */}
      {categories.map((category) => (
        <button
          key={category}
          className={`w-full p-2 mb-2 rounded ${
            selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}

      <h2 className="text-xl font-semibold mt-4">Ordenar por Precio</h2>
      <button className="w-full p-2 mt-2 bg-gray-200" onClick={() => setSortOrder("asc")}>
        Menor a Mayor
      </button>
      <button className="w-full p-2 mt-2 bg-gray-200" onClick={() => setSortOrder("desc")}>
        Mayor a Menor
      </button>
    </div>
  );
};

export default SideBarProducts;
