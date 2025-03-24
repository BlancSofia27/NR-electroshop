"use client";
import { useState } from "react";
import { createProduct, SweetAlert } from "../app/server/api";
import { ReactSortable } from "react-sortablejs"; // Asegúrate de que react-sortablejs esté instalado
import { categories } from "../constants/categoriesApi";
import Loader from "./Loader";
const ProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    old_price: 0,
    stock: "",
    category: "",
    free_shipping: false,
    images: [],
  });

  const categoriesArray = categories.map((category) => category.name);
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar la carga

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
    setIsLoading(true); // Inicia el loader
    try {
      const result = await createProduct(product, product.images);
      if (result) {
          setProduct({ 
          name: "", description: "", price: "", old_price: "", 
          stock: "", category: "", free_shipping: false, images: [] 
        });
      }
    } catch (error) {
      alert("Error al crear producto");
    }finally {
      setIsLoading(false); // Detiene el loader
    }
  };

  return (
    <div className="h-full  text-white  bg-zinc-900 mx-auto  shadow-lg  p-6  ">
      <h2 className="text-2xl font-semibold  mb-4 ml-14">Publicar Producto</h2>
      {isLoading ? (
       <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
       <div className="flex flex-col items-center bg-cyan-400 p-4 rounded-lg shadow-md">
         <Loader />
         <p className="text-zinc-800 ml-2 text-xl">Subiendo producto...</p>
       </div>
     </div>
      ) : (
      <form onSubmit={handleSubmit} className="space-y-4 text-zinc-800">
        <input 
          type="text" 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Nombre del producto" 
          className="w-full p-2 border rounded-lg" 
          maxLength={47}
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
          className="p-2 border rounded-lg text-zinc-500" 
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categoriesArray.map((cat) => (
            <option className="w-[340px] h-7" key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Checkbox de Envío Gratis */}
        <div className="flex flex-row items-center"> 
        <label className="px-3 text-white" >Envio Gratis</label>
        <label className="relative inline-flex items-center cursor-pointer">
  <input 
    type="checkbox" 
    checked={product.free_shipping} 
    onChange={() => setProduct({ ...product, free_shipping: !product.free_shipping })} 
    className="sr-only peer"
  />
  <div className="group peer ring-0 bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600 rounded-full outline-none duration-1000 after:duration-300 w-16 h-8 shadow-md peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39] peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)] after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 peer-checked:after:translate-x-8 peer-hover:after:scale-95 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900">
  </div>
</label>
</div>


        {/* Imagenes con ReactSortable */}
        <ReactSortable
  list={product.images}
  setList={(newImages) => setProduct({ ...product, images: newImages })}
  className="react-sortablejs flex xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-4"
>
  {product.images.map((image, index) => (
    <div key={index} className="sortable-item relative">
      <img
        src={URL.createObjectURL(image)}
        alt={`preview-${index}`}
        className="w-full h-full object-cover rounded-lg shadow-md"
      />
      <span className="absolute top-1 left-1 bg-white bg-opacity-85 font-semibold text-zinc-900 text-xs p-1 rounded-md">
        {`Imagen ${index + 1}`}
      </span>
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
      </form>)}
    </div>
  );
};

export default ProductForm;
