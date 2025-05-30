import { useState, useEffect } from "react";
import { createProduct, deleteProduct } from "../app/server/api";
import { ReactSortable } from "react-sortablejs";
import { categories } from "../constants/categoriesApi";
import Loader from "./Loader";

const ProductFormModal = ({ isOpen, onClose, productToEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    old_price: "",
    stock: "",
    category: "",
    free_shipping: false,
    images: [],
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        old_price: productToEdit.old_price || "",
        stock: productToEdit.stock || "",
        category: productToEdit.category || "",
        free_shipping: productToEdit.free_shipping || false,
        images: productToEdit.images || [],
      });
    }
  }, [productToEdit]);

  const [isLoading, setIsLoading] = useState(false);
  const categoriesArray = categories.map((category) => category.name);

  // Función para manejar la carga de imágenes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (product.images.length + files.length > 5) {
      alert("Solo puedes subir hasta 5 imágenes.");
      return;
    }

    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    setProduct({ ...product, images: [...product.images, ...validFiles] });
  };

  // Función para eliminar imágenes
  const handleRemoveImage = (index) => {
    setProduct({
      ...product,
      images: product.images.filter((_, i) => i !== index),
    });
  };

  // Convierte las URLs de imágenes en archivos Blob antes de enviarlas a createProduct
  const convertUrlsToFiles = async () => {
    const convertedImages = await Promise.all(
      product.images.map(async (img) => {
        if (typeof img === "string") {
          const response = await fetch(img);
          const blob = await response.blob();
          return new File([blob], "image.jpg", { type: blob.type });
        }
        return img;
      })
    );
    return convertedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product.images.length === 0) {
      alert("Debes seleccionar al menos una imagen.");
      return;
    }

    setIsLoading(true);
    try {
      const processedImages = await convertUrlsToFiles();
      await createProduct(product, processedImages);
      setProduct({
        name: "",
        description: "",
        price: "",
        old_price: "",
        stock: "",
        category: "",
        free_shipping: false,
        images: [],
      });
      await deleteProduct(productToEdit.id, productToEdit.images);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} placeholder="Nombre del producto" className="w-full p-2 border rounded-lg" maxLength={47} required />
            <textarea name="description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} placeholder="Descripción" className="w-full h-40 p-2 border rounded-lg" required />
            <input type="number" name="price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder="Precio actual" className="w-full p-2 border rounded-lg" required />
            <select name="category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className="p-2 border rounded-lg text-gray-500 w-full" required>
              <option value="">Seleccionar Categoría</option>
              {categoriesArray.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <div className="flex items-center">
              <label className="mr-3">Envío Gratis</label>
              <input type="checkbox" checked={product.free_shipping} onChange={() => setProduct({ ...product, free_shipping: !product.free_shipping })} className="cursor-pointer" />
            </div>

            {/* Drag & Drop de Imágenes */}
            <ReactSortable list={product.images} setList={(newImages) => setProduct({ ...product, images: newImages })} className="flex flex-wrap gap-2">
              {product.images.map((image, index) => {
                const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;
                return (
                  <div key={index} className="relative flex flex-col items-center">
                    <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2">{index + 1}</span>
                    <img src={imageUrl} alt={`preview-${index}`} className="w-16 h-16 object-cover rounded-lg" />
                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">✖</button>
                  </div>
                );
              })}
            </ReactSortable>

            {/* Input para cargar imágenes */}
            {product.images.length < 5 && (
              <div className="flex items-center gap-2">
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-lg" />
                <button type="button" onClick={() => document.querySelector('input[type="file"]').click()} className="bg-green-500 text-white px-3 py-2 rounded-lg">+</button>
              </div>
            )}

            {/* Botón de publicar */}
            <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Publicar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductFormModal;
