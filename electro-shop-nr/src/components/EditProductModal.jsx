import React, { useState, useEffect } from "react";
import { createProduct, deleteProduct } from "../app/server/api";
import { categories } from "../constants/categoriesApi";
import Loader from "./Loader";

const ProductFormModal = ({ isOpen, onClose, productToEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    may_price: null,
    old_price: null,
    stock: null,
    category: "",
    free_shipping: false,
    images: [],
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || null,
        may_price: productToEdit.may_price || null,
        old_price: productToEdit.old_price || null,
        stock: productToEdit.stock || null,
        category: productToEdit.category || "",
        free_shipping: productToEdit.free_shipping || false,
        images: productToEdit.images || [],
      });
    }
  }, [productToEdit]);

  const [isLoading, setIsLoading] = useState(false);
  const categoriesArray = categories.map((category) => category.name);

  // Manejar la carga de imágenes (máx. 5)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (product.images.length + files.length > 5) {
      alert("Solo puedes subir hasta 5 imágenes.");
      return;
    }
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    setProduct({ ...product, images: [...product.images, ...validFiles] });
  };

  // Eliminar imagen
  const handleRemoveImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  // Convertir URLs en archivos
  const convertUrlsToFiles = async () => {
    return await Promise.all(
      product.images.map(async (img) => {
        if (typeof img === "string") {
          const response = await fetch(img);
          const blob = await response.blob();
          return new File([blob], `image-${crypto.randomUUID()}.jpg`, { type: blob.type });
        }
        return img;
      })
    );
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.images.length === 0) {
      alert("Debes seleccionar al menos una imagen.");
      return;
    }

    setIsLoading(true);
    try {
      const processedImages = await convertUrlsToFiles();
      await deleteProduct(productToEdit.id, productToEdit.images);
      console.log("imagenes a subir:",processedImages);
      await createProduct(product, processedImages);

      setProduct({
        name: "",
        description: "",
        price: null,
        may_price: null,
        old_price: null,
        stock: null,
        category: "",
        free_shipping: false,
        images: [],
      });
      onClose();
    } catch (error) {
      alert("Error al crear producto");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center text-black bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white px-6 py-9 rounded-lg shadow-lg w-11/12 max-w-lg h-[80vh] overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 text-2xl" onClick={onClose}>✖</button>
        <h2 className="text-2xl font-semibold mb-4">Publicar Producto</h2>

        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader />
            <p className="text-gray-800">Subiendo producto...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="text-blue-500 p-2">Nombre del producto</label>
            <input type="text" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="w-full p-2 border rounded-lg mb-4" required maxLength={47} />

            <label className="text-blue-500 p-2">Descripción del producto</label>
            <textarea name="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} className="w-full h-48 p-2 border rounded-lg mb-4" required />

            <label className="text-blue-500 p-2">Precio actual minorista</label>
            <input type="number" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} className="w-full p-2 border rounded-lg mb-2" required />

            <label className="text-blue-500 p-2">Categoría</label>
            <select name="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="p-2 border rounded-lg text-gray-500 w-full mb-2" required>
              <option value="">Seleccionar Categoría</option>
              {categoriesArray.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <div className="flex items-center">
              <label className="m-6">Envío Gratis</label>
              <input type="checkbox" checked={product.free_shipping} onChange={() => setProduct({ ...product, free_shipping: !product.free_shipping })} className="cursor-pointer" />
            </div>

            {/* Input para cargar imágenes */}
            <div className="mt-4">
              <label className="text-blue-500">Subir imágenes (Máximo 5)</label>
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-lg" disabled={product.images.length >= 5} />
            </div>

            {/* Vista previa de imágenes */}
            <div className="flex flex-wrap gap-2 mt-4">
              {product.images.map((image, index) => {
                const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;
                return (
                  <div key={index} className="relative">
                    <img src={imageUrl} alt={`preview-${index}`} className="w-16 h-16 object-cover rounded-lg" />
                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">✖</button>
                  </div>
                );
              })}
            </div>

            {/* Botón de publicar */}
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg mt-4">Publicar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductFormModal;
