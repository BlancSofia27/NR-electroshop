import { useState } from "react";
import { createProduct } from "../app/server/api";
import { ReactSortable } from "react-sortablejs"; // Asegúrate de que react-sortablejs esté instalado

const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: null,
    old_price: null,
    stock: "",
    category: "",
    free_shipping: false,
    images: [],
  });

  const categories = ["Accesorios", "Parlantes", "Audio", "Entretenimiento", "Hogar"];

  // Manejo de cambios en los campos de texto y números
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ 
      ...product, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  // Manejo de los cambios en el campo de imágenes
  const handleFileChange = (e) => {
    if (e.target.files.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes.");
      return;
    }

    const files = Array.from(e.target.files);
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

    if (product.images.length === 0) {
      alert("Debes seleccionar al menos una imagen.");
      return;
    }

    try {
      const result = await createProduct(product, product.images);
      if (result) {
        alert("Producto creado correctamente");
        setProduct({ 
          name: "", description: "", price: "", old_price: "", 
          stock: "", category: "", free_shipping: false, images: [] 
        });
      }
    } catch (error) {
      alert("Error al crear producto");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Publicar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Nombre del producto" 
          className="w-full p-2 border rounded-lg" 
          required 
        />
        <textarea 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Descripción" 
          className="w-full p-2 border rounded-lg" 
          required
        ></textarea>
        
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Precio actual" 
          className="w-full p-2 border rounded-lg" 
          required 
        />
        <input 
          type="number" 
          name="old_price" 
          value={product.old_price ?? null} 
          onChange={handleChange} 
          placeholder="Precio anterior" 
          className="w-full p-2 border rounded-lg" 
        />

        <input 
          type="number" 
          name="stock" 
          value={product.stock} 
          onChange={handleChange} 
          placeholder="Stock" 
          className="w-full p-2 border rounded-lg" 
          required 
        />

        {/* Selector de Categoría */}
        <select 
          name="category" 
          value={product.category} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-lg" 
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Checkbox de Envío Gratis */}
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="free_shipping" 
            checked={product.free_shipping} 
            onChange={handleChange} 
          />
          <label>Envío Gratis</label>
        </div>

        {/* Imagenes con ReactSortable */}
        <ReactSortable 
          list={product.images} 
          setList={(newImages) => setProduct({ ...product, images: newImages })} 
          className="react-sortablejs"
        >
          {product.images.map((image, index) => (
            <div key={index} className="sortable-item">
              <img 
                src={URL.createObjectURL(image)} 
                alt={`preview-${index}`} 
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </ReactSortable>

        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded-lg" 
          required 
        />

        <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">Publicar</button>
      </form>
    </div>
  );
};

export default ProductForm;
