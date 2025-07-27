import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { issue } from "@/src/db/schema";
import { getServerAuthSession } from "@/utils/server-auth";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest) {
  const { issueId, issueTitle, issueDescription, issuePriority, issueStatus } =
    await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly log in!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedIssue = await db.update(issue)
      .set({
        title: issueTitle,
        description: issueDescription,
        priority: issuePriority,
        status: issueStatus,
        updatedAt: new Date(),
      })
      .where(eq(issue.id, issueId))
      .returning();

    if (updatedIssue.length > 0) {
      return new Response(JSON.stringify({ message: "Issue updated!" }));
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error updating issue!" }));
  }
}
