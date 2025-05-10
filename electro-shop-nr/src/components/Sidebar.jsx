"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex py-3 bg-zinc-900">
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        className="fixed top-3 left-4 z-50 p-2 text-white rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX className="w-6 h-6 ml-48" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-64 bg-zinc-800 text-white shadow-lg md:translate-x-0 md:block z-40"
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <ul className="p-4 space-y-2">
          <li
            className="cursor-pointer p-3 rounded-lg transition-transform duration-200 hover:bg-gray-800 hover:scale-105"
            onClick={() => router.push("/admin/create")}
          >
            Nuevo Producto
          </li>
          <li
            className="cursor-pointer p-3 rounded-lg transition-transform duration-200 hover:bg-gray-800 hover:scale-105"
            onClick={() => router.push("/admin/editProduct")}
          >
            Editar Productos
          </li>
          <li
            className="cursor-pointer p-3 rounded-lg transition-transform duration-200 hover:bg-gray-800 hover:scale-105"
            onClick={() => router.push("/admin/pedidos")}
          >
            Pedidos
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Sidebar;
