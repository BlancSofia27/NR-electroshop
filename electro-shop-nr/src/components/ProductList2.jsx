'use client';
import ProductCard from './ProductCard'; // Asegúrate de importar ProductCard correctamente

const ProductList2 = ({ products }) => {
  return (
    <div className="container mx-auto py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} className="w-full max-w-[250px] h-full" />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p>No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList2;
