import { useState } from "react";
import { createProduct } from "../app/server/api";

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  // Manejo de cambios en los campos de texto
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Manejo de los cambios en el campo de imágenes
  const handleFileChange = (e) => {
    if (e.target.files.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes.");
      return;
    }

    const files = Array.from(e.target.files);
    // Verificar que todos los archivos sean imágenes
    const validFiles = files.filter(file => file.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      alert("Por favor, selecciona solo archivos de imagen.");
      return;
    }

    setProduct({ ...product, images: validFiles });
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que al menos haya una imagen
    if (product.images.length === 0 || product.images.some(img => img === null)) {
      alert("Debes seleccionar al menos una imagen válida.");
      return;
    }

    try {
      // No recargar el formulario y esperar la respuesta de la API
      const result = await createProduct(product, product.images);
      if (result) {
        alert("Producto creado correctamente");
        setProduct({ name: "", description: "", price: "", stock: "", category: "", images: [] }); // Resetear el formulario
      }
    } catch (error) {
      alert("Error al crear producto");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Publicar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre del producto" className="w-full p-2 border rounded-lg" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Descripción" className="w-full p-2 border rounded-lg" required></textarea>
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Precio" className="w-full p-2 border rounded-lg" required />
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded-lg" required />
        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Categoría" className="w-full p-2 border rounded-lg" required />
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-lg" required />
        <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Publicar</button>
      </form>
    </div>
  );
};

export default ProductForm;
