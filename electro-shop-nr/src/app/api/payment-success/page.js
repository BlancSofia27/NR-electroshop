// pages/api/payment-success.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Puedes agregar lógica adicional, como mostrar un mensaje de éxito, etc.
    // También podrías redirigir automáticamente después de cierto tiempo si lo deseas.
    const timer = setTimeout(() => {
      router.push('/'); // Redirigir a la página principal o a una página personalizada
    }, 5000); // Redirige después de 5 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-green-600">¡Pago Aprobado!</h1>
        <p className="mt-4 text-xl text-green-600">Gracias por tu compra, tu pago ha sido aprobado con éxito.</p>
      </div>
    </div>
  );
}
