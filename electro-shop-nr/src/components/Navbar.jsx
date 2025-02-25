'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          ElectroShop
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/products" className="hover:text-gray-400">Productos</Link></li>
          <li><Link href="/categories" className="hover:text-gray-400">Categorías</Link></li>
          <li><Link href="/contact" className="hover:text-gray-400">Contacto</Link></li>
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 hover:text-gray-400" />
          </Link>
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
