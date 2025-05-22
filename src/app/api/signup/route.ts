import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, name, password } = await request.json();
    if (!email || !name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.insert(users).values({ email, name, password: hashedPassword });
    return NextResponse.json({ success: true,redirect:"/auth/signin" });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
