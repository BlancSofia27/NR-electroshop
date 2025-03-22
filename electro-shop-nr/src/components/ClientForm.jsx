"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setClientData } from '../redux/clientDataSlice'; // Importar la acción de Redux
import { useRouter } from 'next/navigation';

export default function ClientForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Obtener los datos del carrito desde el estado global
  const cartData = useSelector(state => state.cart.items); // Asegúrate de que el estado de Redux tenga esta estructura

  const [formData, setFormData] = useState({
    name: '',
    document: '',
    products: cartData, // Guardamos el carrito original (lo usaremos después para extraer solo lo necesario)
    cp: '',
    street: '',
    heigth_street: '',
    floor_departament: '',
    number_departament: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extraemos solo el id y la cantidad de cada producto en el carrito
    const products = cartData.map(item => ({
      id: item.id,  // Solo el ID del producto
      quantity: item.quantity  // Solo la cantidad
    }));

    // Guardar los datos del formulario en el estado global de Redux
    dispatch(setClientData(formData));

    // Preparar los datos para pasar por la URL
    const queryParams = new URLSearchParams({
      ...formData,
      products: JSON.stringify(products), // Enviamos solo el id y la cantidad como un JSON
    }).toString();

    // Redirigir a la API pasando los datos como parámetros en la URL
    router.push(`/api/?${queryParams}`);
    
    alert('Datos guardados y enviados');
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 pt-12 text-zinc-800">
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="input-field"
        />
        <input
          name="document"
          type="number"
          value={formData.document}
          onChange={handleChange}
          placeholder="Documento"
          required
          className="input-field"
        />
      </div>

      {/* Otros campos de entrada (como los de dirección, teléfono, etc.) */}
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="cp"
          type="number"
          value={formData.cp}
          onChange={handleChange}
          placeholder="Código Postal"
          required
          className="input-field"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          placeholder="Calle"
          required
          className="input-field"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="heigth_street"
          type="number"
          value={formData.heigth_street}
          onChange={handleChange}
          placeholder="Altura"
          required
          className="input-field"
        />
        <input
          name="floor_departament"
          type="number"
          value={formData.floor_departament}
          onChange={handleChange}
          placeholder="Piso"
          className="input-field"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="number_departament"
          type="number"
          value={formData.number_departament}
          onChange={handleChange}
          placeholder="Número Dpto"
          className="input-field"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input-field"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <input
          name="phone"
          type="number"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          className="input-field"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="w-full my-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar Datos
        </button>
      </div>
    </form>
  );
}
