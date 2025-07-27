import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getServerAuthSession() {
  return await auth.api.getSession({
    headers: headers()
  });
}
