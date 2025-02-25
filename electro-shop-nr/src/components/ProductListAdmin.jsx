import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../app/server/api";
import Image from "next/image";
import Slider from "react-slick"; // Importar react-slick
import { X } from "lucide-react"; // Importar el icono "X" de LucideReact

// Configuración de Slick
const carouselSettings = {
  dots: true,  // Mostrar los puntos de navegación
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleDelete = async (id, images) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      await deleteProduct(id, images);
      fetchProducts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg mb-6 border border-gray-300 h-[270px]">
          <div className="flex flex-row">
            {/* Carrusel de imágenes */}
            <div className="w-[200px] h-[250px]">
              <Slider {...carouselSettings}>
                {product.images.map((imageUrl, index) => (
                  <div key={index} className="w-full h-full">
                    <Image
                      src={imageUrl}
                      alt={`Imagen del producto ${product.name}`}
                      layout="responsive"
                      width={200}   // Establece un ancho fijo
                      height={250}  // Establece una altura fija
                      className=" rounded-lg "
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-center p-3 mx-4">
              <div>
                <h3 className="text-md font-semibold text-gray-900">{product.name}</h3>
                <p className="text-gray-700 mt-2 overflow-y-auto max-h-24 h-24">{product.description}</p> {/* Descripción con scroll */}
                <p className="text-gray-900 font-bold mt-4 text-md">${product.price}</p>
              </div>

              {/* Botones de acción */}
              <div className="absolute bottom-2 right-24 flex space-x-4">
                <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300">Editar</button>
                <button 
                  onClick={() => handleDelete(product.id, product.images)} 
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                >
                  <X size={24} /> {/* Icono de "X" de LucideReact */}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListAdmin;
