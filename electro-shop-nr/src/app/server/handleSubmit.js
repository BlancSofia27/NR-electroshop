import { redirect } from "next/navigation";
export async function handleSubmit() {
    "use server";

    const url = await apiMP.purchases.submit(user.marketplace);
    redirect(url);
  }