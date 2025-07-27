import { getServerAuthSession } from "@/utils/server-auth";
import { db } from "@/src/db/drizzle";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session?.user.email) {
    return Response.json({ message: "Kindly log in to access this page!" });
  }

  const userID = session.user.id;

  if (userID) {
    const userDetails = await db.select().from(user).where(eq(user.email, session.user.email)).limit(1);

    return Response.json(userDetails[0] || null);
  }

  return Response.json({ message: "Error while fetching user details." });
}
