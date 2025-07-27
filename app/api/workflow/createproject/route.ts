import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { project } from "@/src/db/schema";
import { getServerAuthSession } from "@/utils/server-auth";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { projTitle, projDescription, projContent, priority, status } =
    await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" });
  }

  if (session?.user.id) {
    const response = await db.insert(project).values({
      id: nanoid(),
      title: projTitle,
      description: projDescription,
      createdBy: session.user.id,
      content: projContent,
      priority: priority,
      status: status,
    }).returning();
    
    if (response.length > 0) {
      return Response.json({
        message: "New project created!",
      });
    }
  }
  return Response.json({ message: "Error occured!" });
}
