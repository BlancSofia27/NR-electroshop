'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Efecto para manejar el cambio de tamaño al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Cambia el valor para ajustar cuando debe cambiar
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpieza del evento cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`text-slate-700 shadow-md fixed top-0 w-full z-10 transition-all ${scrolling ? 'bg-white shadow-lg py-2' : 'py-4'}`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <Image
            src="/nr-logo.jpg"
            alt="North Rizkon Electronica inicio"
            width={scrolling ? 60 : 80} // Reduce el tamaño del logo al hacer scroll
            height={scrolling ? 60 : 80} // Ajuste proporcional
            className="transition-all"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/products" className="hover:text-gray-400">Productos</Link></li>
          <li><Link href="/categories" className="hover:text-gray-400">Categorías</Link></li>
          <li><Link href="/contact" className="hover:text-gray-400">Contacto</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* <Link href="/cart" className="relative">
          </Link> */}
            <ShoppingCart className="w-6 h-6 hover:text-gray-400" />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-center p-4">
          <ul className="space-y-4">
            <li><Link href="/products" onClick={() => setIsOpen(false)}>Productos</Link></li>
            <li><Link href="/categories" onClick={() => setIsOpen(false)}>Categorías</Link></li>
            <li><Link href="/contact" onClick={() => setIsOpen(false)}>Contacto</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
