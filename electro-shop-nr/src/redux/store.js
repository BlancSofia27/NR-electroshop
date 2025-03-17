// src/store.js
"use client";
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Importamos el reducer del carrito

// Configurar la store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // El nombre 'cart' es el nombre del slice
  },
});
