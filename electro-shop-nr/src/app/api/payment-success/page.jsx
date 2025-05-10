// pages/api/payment-success.js
"use client";



export default function PaymentSuccess() {




  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-green-600">¡Pago Aprobado!</h1>
        <p className="mt-4 text-xl text-green-600">Gracias por tu compra, tu pago ha sido aprobado con éxito.</p>
      </div>
    </div>
  );
}
