import { createSlice } from '@reduxjs/toolkit';

// Recuperar el carrito desde localStorage si existe (solo en el lado del cliente)
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cartM');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return []; // En el servidor, retornamos un carrito vacío
};

export const cartMSlice = createSlice({
  name: 'cartMayorista',
  initialState: {
    items: loadCartFromLocalStorage(), // Cargamos el carrito desde localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }

      // Aseguramos que localStorage solo se acceda en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartM', JSON.stringify(state.items)); // Guardamos el carrito actualizado
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartM', JSON.stringify(state.items)); // Guardamos el carrito actualizado
      }
    },
    clearCart: (state) => {
      state.items = [];

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartM', JSON.stringify(state.items)); // Guardamos el carrito vacío
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

// Exportación corregida con el nuevo nombre
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartMSlice.actions;
export default cartMSlice.reducer;