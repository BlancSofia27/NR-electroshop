"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import CartM from "./CartMay";

const NavbarMay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all text-zinc-700 bg-white shadow-md ${scrolling ? "py-2" : "py-4"}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <Image src="/nr-logo.jpg" alt="Logo" width={scrolling ? 60 : 80} height={scrolling ? 60 : 80} className="transition-all" />
          </Link>

          {/* Menú de escritorio */}
          <ul className="hidden md:flex space-x-6 text-base">
            <li><Link href="/" className="hover:text-gray-400">Inicio</Link></li>
            <li><Link href="/store/categories" className="hover:text-gray-400">Categorias</Link></li>
            <li><Link href="/store/products?category=combos&maxPrice=1000000&sortOrder=asc" className="hover:text-gray-400">Combos</Link></li>
            <li><Link href="/store/como-comprar" className="hover:text-gray-400">Cómo Comprar</Link></li>
          </ul>

          {/* Iconos */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-6 h-6 hover:text-gray-400" />
            </button>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-[190px] text-zinc-800 bg-white shadow-lg md:hidden z-50">
          <div className="flex justify-between p-4">
            <div className="text-xl font-bold">Menú</div>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col items-center ">
          <li><Link href="/" className="hover:text-gray-400">Inicio</Link></li>
            <li><Link href="/store/categories" className="hover:text-gray-400 py-2">Categorias</Link></li>
            <li><Link href="/store/products?category=combos&maxPrice=1000000&sortOrder=asc" className="hover:text-gray-400 py-2">Combos</Link></li>
            <li><Link href="/store/como-comprar" className="hover:text-gray-400 py-2">Cómo Comprar</Link></li>
          </ul>
        </div>
      )}

      {/* Sidebar del carrito */}
      <CartM isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default NavbarMay;
