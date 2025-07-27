import { NextRequest } from "next/server";
import { db } from "@/src/db/drizzle";
import { user } from "@/src/db/schema";
import { getServerAuthSession } from "@/utils/server-auth";
import { eq } from "drizzle-orm";

export async function PATCH(request: NextRequest) {
  const { username, fullname } = await request.json();

  const session = await getServerAuthSession();

  if (!session?.user.id) {
    return new Response(JSON.stringify({ message: "Kindly log in!" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedProfile = await db.update(user)
      .set({
        name: fullname,
        username: username,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id))
      .returning();

    if (updatedProfile.length > 0) {
      return new Response(JSON.stringify({ message: "User info updated!" }));
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error updating user info!" })
    );
  }
}
