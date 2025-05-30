import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "../redux/cartMSlice";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProductById } from "../app/server/api"; // Asume que esta función existe
import ResumeButtonM from "../components/ResumeButtonM";


const CartM = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cartM.items);
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false); // Nueva variable de estado

  useEffect(() => {
    setIsClient(true); // Esto asegura que el código solo se ejecute en el cliente
    console.log("cartItems:", cartItems);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const productPromises = cartItems.map((item) => getProductById(item.id));
        const productsData = await Promise.all(productPromises);

        const productsMap = productsData.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});

        setProductDetails(productsMap);
      } catch (err) {
        setError("Error al cargar los productos");
      }
    };

    if (cartItems.length > 0) {
      fetchData();
    }
  }, [cartItems]);

  const increaseQuantity = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  if (!isClient) {
    return null; // Retorna null hasta que esté en el cliente
  }

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      onClick={onClose}
    >
      <div
        className={`w-80 h-full text-zinc-800 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Tu Carrito</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">El carrito está vacío.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-2">
                {productDetails[item.id] && (
                  <>
                    <Image
                      src={productDetails[item.id].images[0]}
                      alt={productDetails[item.id].name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div className="flex-1 ml-3">
                      <p className="text-sm font-medium">{productDetails[item.id].name}</p>
                      <p className="text-xs text-gray-500">${productDetails[item.id].may_price}</p>
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2 mr-3">
                  <button onClick={() => decreaseQuantity(item)} className="text-gray-600 hover:text-black">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)} className="text-gray-600 hover:text-black">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-xs"
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="flex flex-row justify-center p-4 border-t text-nowrap">
            <button
              onClick={() => dispatch(clearCart())}
              className=" bg-black text-white font-semibold py-3 px-6 mx-2 hover:bg-zinc-700 transition"
            >
              Vaciar carrito
            </button>
            <ResumeButtonM/>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartM;
