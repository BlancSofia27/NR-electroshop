// pages/api/payment-pending.js
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PaymentPending() {
  const router = useRouter();

  useEffect(() => {
    // Lógica similar a la página de éxito, pero aquí puedes informar al usuario que su pago está pendiente.
    const timer = setTimeout(() => {
      router.push('/'); // Redirige a la página principal o a una página personalizada
    }, 5000); // Redirige después de 5 segundos

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-yellow-600">Pago en Proceso</h1>
        <p className="mt-4 text-xl text-yellow-600">Tu pago está siendo procesado, por favor espera unos momentos.</p>
      </div>
    </div>
  );
}
