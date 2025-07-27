import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { project, issue } from "@/src/db/schema";
import { getServerAuthSession } from "@/utils/server-auth";
import { eq } from "drizzle-orm";

export async function DELETE(request: NextRequest) {
  const { projectId } = await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" }, { status: 401 });
  }

  try {
    // Delete related issues first due to foreign key constraint
    await db.delete(issue).where(eq(issue.projectId, projectId));
    // Then delete the project
    await db.delete(project).where(eq(project.id, projectId));
    
    return Response.json(
      { message: "Project and related issues deleted!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete project error:", error);
    return Response.json({ message: "Error occurred!" }, { status: 500 });
  }
}
