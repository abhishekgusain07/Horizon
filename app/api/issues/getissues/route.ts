import { getServerAuthSession } from "@/utils/server-auth";
import { db } from "@/src/db/drizzle";
import { issue } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { project_id } = await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly Sign in!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (project_id) {
    const issues = await db.select().from(issue).where(eq(issue.projectId, project_id));
    if (issues) {
      return new Response(JSON.stringify(issues), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  return new Response(
    JSON.stringify({
      message: "Failed to fetch issues with the project id.",
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
