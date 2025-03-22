// pages/api/payment-failed.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentFailed() {
  const router = useRouter();

  useEffect(() => {
    // Aquí puedes proporcionar un enlace para volver a intentar el pago, por ejemplo.
    const timer = setTimeout(() => {
      router.push('/'); // Redirige a la página principal o a una página personalizada
    }, 5000); // Redirige después de 5 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-red-600">Pago Rechazado</h1>
        <p className="mt-4 text-xl text-red-600">Lamentablemente, tu pago ha sido rechazado. Por favor, intenta nuevamente.</p>
      </div>
    </div>
  );
}
