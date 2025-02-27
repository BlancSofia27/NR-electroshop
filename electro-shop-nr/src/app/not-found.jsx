// app/not-found.tsx
import { HardHat } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
    <div className="bg-verde h-full w-full"></div>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
  <HardHat className="w-20 h-20 text-verde mb-6" />
  <h1 className="text-3xl font-bold text-gray-800">
    Página próximamente disponible
  </h1>
  <p className="text-lg text-gray-600 mt-4">
    Estamos trabajando para traerte esta página lo antes posible.
  </p>
  <Link href="/" className="mt-6 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg">
    Regresar al inicio
  </Link>
</div>
</>
  );
}
