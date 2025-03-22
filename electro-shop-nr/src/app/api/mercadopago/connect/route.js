import { NextResponse } from "next/server";
import apiMP from "../../../../api-mercado-pago";

export async function GET(request) {
  const code = request.nextUrl.searchParams.get("code");
  const credentials = await apiMP.user.connect(code);
  await apiMP.user.update({ marketplace: credentials.access_token });
  return NextResponse.redirect(process.env.APP_URL);
}
