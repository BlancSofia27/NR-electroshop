import ProductDetail from "../../../components/ProductDetail";
import { getProductById } from "../../server/api";

// Esta página recibe los parámetros de la URL
export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  

  if (!id) {
    return <div>Error: No se proporcionó un ID válido para el producto.</div>;
  }

  // Obtener el producto usando el id
  const product = await getProductById(id);

  // Verifica si el producto fue recibido correctamente
  if (!product) {
    return <div>Error: No se pudo obtener el producto.</div>;
  }

  return (
    <div>
      {/* Pasa el producto completo a ProductDetail */}
      <ProductDetail product={product} />
    </div>
  );
}
