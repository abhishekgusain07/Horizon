import { getServerAuthSession } from "@/utils/server-auth";
import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { project } from "@/src/db/schema";
import { eq } from "drizzle-orm";

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
    const response = await db.select().from(project).where(eq(project.id, project_id));
    const foundProject = response[0];
    if (foundProject) {
      return new Response(JSON.stringify(foundProject), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  return new Response(
    JSON.stringify({
      message: "Failed to fetch project with the project id.",
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
