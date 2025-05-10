// pages/api/payment-failed.js
"use client";



export default function PaymentFailed() {


 

  return (
    <div className="flex justify-center items-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-red-600">Pago Rechazado</h1>
        <p className="mt-4 text-xl text-red-600">Lamentablemente, tu pago ha sido rechazado. Por favor, intenta nuevamente.</p>
      </div>
    </div>
  );
}
