"use client";

import React from "react";

const messages = [
  "Tu lugar de confianza para la compra de tecnología.",
  "|",
  "Tu lugar de confianza para la compra de tecnología.",
  "|",
  "Tu lugar de confianza para la compra de tecnología.",
  "|",
];

const CarouselText = () => {
  return (
    <div className="w-full h-auto bg-verde overflow-hidden relative flex bg-zinc-900">
      <div className="animate-marquee flex whitespace-nowrap text-white py-3 gap-5 text-2xl">
        {/* 🔹 Duplicamos el texto para el efecto infinito */}
        {[...messages, ...messages].map((message, index) => (
          <span key={index} className="px-8">{message}</span>
        ))}
      </div>
    </div>
  );
};

export default CarouselText;
