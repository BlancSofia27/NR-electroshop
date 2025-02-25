"use client";
import { useState } from "react";
import ProductForm from "./ProductForm";
import ProductListAdmin from "./ProductListAdmin";


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("create"); // Estado para cambiar entre las opciones
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del menú en móviles

  return (
    <div className="flex">
      {/* Barra lateral para pantallas grandes */}
      <div
        className={`w-64 h-screen bg-gray-800 text-white p-4 md:block ${isOpen ? "block" : "hidden"}`}
      >
        <ul>
          <li
            className={`cursor-pointer py-2 ${activeTab === "create" ? "bg-gray-600" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Nuevo 
            producto
          </li>
          <li
            className={`cursor-pointer py-2 ${activeTab === "edit" ? "bg-gray-600" : ""}`}
            onClick={() => setActiveTab("edit")}
          >
            Editar Productos
          </li>
          
          
        </ul>
      </div>

      {/* Botón de hamburguesa para pantallas pequeñas */}
      <button
        className="block md:hidden p-4 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Contenido principal */}
      <div className="flex-1 p-4">
        {activeTab === "create" && <ProductForm />}
        {activeTab === "edit" && <ProductListAdmin/>}
      </div>
    </div>
  );
};

export default Sidebar;
