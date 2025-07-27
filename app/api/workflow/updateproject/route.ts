import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { project } from "@/src/db/schema";
import { getServerAuthSession } from "@/utils/server-auth";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest) {
  const {
    projectId,
    projTitle,
    projDescription,
    projContent,
    priority,
    status,
  } = await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly log in!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedProject = await db.update(project)
      .set({
        title: projTitle,
        description: projDescription,
        content: projContent,
        priority: priority,
        status: status,
        updatedAt: new Date(),
      })
      .where(eq(project.id, projectId))
      .returning();

    if (updatedProject.length > 0) {
      return new Response(JSON.stringify({ message: "Project updated!" }));
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error updating project!" }));
  }
}
