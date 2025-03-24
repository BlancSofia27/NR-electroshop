import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import apiMP, { mercadopago } from "../../../../api-mercado-pago";

export async function POST(request) {
  try {
    const body = await request.json();
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    if (payment.status === "approved") {
      await apiMP.purchases.add({ id_payment: payment.id, status_payment: payment.status });
      revalidatePath("/api/payment-success");
    }
    if (payment.status === "in_process") {
      revalidatePath("/api/payment-pending");
    }
    if (payment.status === "rejected") {
      revalidatePath("/api/payment-failed");
    }

    return new Response(null, { status: 200 });

  } catch (error) {
    console.error("Error en el webhook de MercadoPago:", error);
    return new Response(JSON.stringify({ error: "Error procesando la notificación" }), { 
      status: 500, 
      headers: { "Content-Type": "application/json" } 
    });
  }
}
