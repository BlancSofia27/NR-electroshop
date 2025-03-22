import { redirect } from "next/navigation";
import apiMP from "../../api-mercado-pago"; // Ahora usamos apiMP en lugar de apiMP

export const dynamic = "force-dynamic";

export default async function MarketplacePage({searchParams}) {
  const {name,document,products,cp,street,heigth_street,floor_departament,number_departament,email,phone} = await searchParams
  const dataClient = {name,document,products,cp,street,heigth_street,floor_departament,number_departament,email,phone}
  const user = await apiMP.user.fetch(); // Obtener datos del user
  const purchases = await apiMP.purchases.list(); // Obtener comprar

    // Obtenemos la URL de autorización
    const authorizationUrl = await apiMP.user.authorize();
    console.log("data en page",dataClient);

    async function handleSubmit() {
      "use server";
  
      const url = await apiMP.purchases.submit(dataClient, user.marketplace);
      redirect(url);
    }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white text-zinc-800 shadow-md rounded-lg space-y-8 ">
      <h1 className="text-3xl font-semibold text-center ">Marketplace</h1>

      {user ? (
        <div>
          <div className="text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Pagar con MercadoPago
            </button>
          </div>
          </div>
       
      ) : (
        <a href={authorizationUrl} className="text-center text-zinc-600">Vincula tu marketplace para continuar</a>
      )} 

      <h2 className="text-2xl font-semibold text-zinc-800">Tus Compras</h2>
      <ul className="space-y-4">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
            <span className="font-medium text-zinc-800">{purchase.name}</span>
            <span className="text-zinc-600">${purchase.total_price}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
