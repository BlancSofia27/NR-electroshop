import { createSlice } from '@reduxjs/toolkit';

// Recuperar el carrito desde localStorage si existe (solo en el lado del cliente)
const loadCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return []; // En el servidor, retornamos un carrito vacío
};

export const cartSlice = createSlice({
  name: 'cart',
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
      console.log('Producto agregado al carrito:', action.payload);
      console.log('Estado actual del carrito:', state.items);

      // Aseguramos que localStorage solo se acceda en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items)); // Guardamos el carrito actualizado
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      // Aseguramos que localStorage solo se acceda en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items)); // Guardamos el carrito actualizado
      }
    },
    clearCart: (state) => {
      state.items = [];

      // Aseguramos que localStorage solo se acceda en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items)); // Guardamos el carrito vacío
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

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
