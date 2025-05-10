"use client";
import { useState, useEffect } from "react";
import apiMP from "../../../api-mercado-pago";
import { updateDeliveryStatus } from "../../server/api";

const fetchPurchases = async () => {
  try {
    const purchases = await apiMP.purchases.list();
    return purchases;
  } catch (error) {
    console.error("Error al obtener compras:", error);
    return [];
  }
};

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases().then(setPurchases);
  }, []);

  const handleDeliveryChange = async (id, newStatus) => {
    const success = await updateDeliveryStatus(id, newStatus);
    if (success) {
      setPurchases((prev) =>
        prev.map((purchase) =>
          purchase.id === id ? { ...purchase, delivered: newStatus } : purchase
        )
      );
    }
  };

  return (
    <div className="p-6 text-zinc-900">
      <h2 className="text-2xl font-semibold text-zinc-800 mb-4">Tus Compras</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Documento</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Fecha</th>
              <th className="p-2 border">Ciudad</th>
              <th className="p-2 border">Provincia</th>
              <th className="p-2 border">Calle</th>
              <th className="p-2 border">Altura</th>
              <th className="p-2 border">Piso</th>
              <th className="p-2 border">Número Departamento</th>
              <th className="p-2 border">Celular</th>
              <th className="p-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="text-center">
                <td className="p-2 border">{purchase.name}</td>
                <td className="p-2 border">{purchase.document}</td>
                <td className="p-2 border">${purchase.total_price}</td>
                <td className="p-2 border">{new Date(purchase.created_at).toLocaleDateString()}</td>
                <td className="p-2 border">{purchase.city}</td>
                <td className="p-2 border">{purchase.province}</td>
                <td className="p-2 border">{purchase.street}</td>
                <td className="p-2 border">{purchase.heigth_street}</td>
                <td className="p-2 border">{purchase.floor_departament}</td>
                <td className="p-2 border">{purchase.number_departament}</td>
                <td className="p-2 border">{purchase.phone}</td>
                <td className="p-2 border">
                  <select
                    className="border p-1 rounded"
                    value={purchase.delivered ? "true" : "false"}
                    onChange={(e) => handleDeliveryChange(purchase.id, e.target.value === "true")}
                  >
                    <option value="true">Enviado</option>
                    <option value="false">Pendiente</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
