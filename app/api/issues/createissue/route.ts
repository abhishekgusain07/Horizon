import { getServerAuthSession } from "@/utils/server-auth";
import { db } from "@/src/db/drizzle";
import { issue } from "@/src/db/schema";
import { NextRequest } from "next/server";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const {
    issueTitle,
    issueDescription,
    issueStatus,
    issuePriority,
    projectId,
  } = await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return Response.json({ message: "Kindly log in!" });
  }

  if (session.user.id) {
    const response = await db.insert(issue).values({
      id: nanoid(),
      title: issueTitle,
      description: issueDescription,
      status: issueStatus,
      priority: issuePriority,
      projectId: projectId,
    }).returning();
    
    if (response.length > 0) {
      return Response.json({
        message: "New issue created!",
      });
    }
  }
  return Response.json({ message: "Error occured!" });
}
