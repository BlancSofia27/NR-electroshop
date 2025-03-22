import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  clientData: null, // Almacena los datos del cliente
};

// Crear el slice
const clientDataSlice = createSlice({
  name: 'clientData', // Nombre del slice
  initialState,
  reducers: {
    // Acción para actualizar los datos del cliente
    setClientData: (state, action) => {
      state.clientData = action.payload;
    },
    // Acción para borrar los datos del cliente (opcional)
    clearClientData: (state) => {
      state.clientData = null;
    },
  },
});

// Exportamos las acciones
export const { setClientData, clearClientData } = clientDataSlice.actions;

// Exportamos el reducer
export default clientDataSlice.reducer;
