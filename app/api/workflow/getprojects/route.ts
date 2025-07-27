import { getServerAuthSession } from "@/utils/server-auth";
import { db } from "@/src/db/drizzle";
import { project } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return Response.json({ message: "Log in first!" });
  }

  const userID = session.user.id;

  if (userID) {
    const response = await db.select().from(project).where(eq(project.createdBy, userID));

    if (response) {
      return Response.json(response);
    }
  }
  return Response.json({ message: "Failed" });
}
