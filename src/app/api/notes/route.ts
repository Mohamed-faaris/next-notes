import { auth } from "~/server/auth";
import { getNoteTitlesByUserId, insertNote } from "~/server/db/helpers";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const session = await auth();
  //if(!session?.user?.id) return NextResponse.json({ error: "Unauthorized",redirect:"auth/signin" }, { status: 401 })
  if (!session?.user?.id) {
    const titles = await getNoteTitlesByUserId("test");
    return NextResponse.json({ titles }, { status: 200 });
  }
  const titles = await getNoteTitlesByUserId(session.user.id);
  return NextResponse.json({ titles }, { status: 200 });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json(
      { error: "Unauthorized", redirect: "auth/signin" },
      { status: 401 },
    );
  const body = await request.json();
  const { title } = body;
  if (!title)
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const noteId = await insertNote(title, session.user.id);
  return NextResponse.json({ noteId }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { noteId, newTitle } = await request.json();
  const res = await db
    .update(notes)
    .set({ title: newTitle })
    .where(eq(notes.id, noteId));
  if (!res.rowsAffected)
    return NextResponse.json({ msg: "not updated" }, { status: 401 });
  return NextResponse.json({ msg: "note title updated" });
}
