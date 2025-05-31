import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await params;
  const { content } = await request.json();
  const res = await db
    .update(notes)
    .set({ content: content })
    .where(eq(notes.id, noteId));
  return Response.json({ msg: "Note updated" });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await params;
  const [note] = await db.select().from(notes).where(eq(notes.id, noteId));

  return Response.json(note);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await params;
  const res = await db.delete(notes).where(eq(notes.id, noteId));
  if (res.rowsAffected)
    return Response.json({ message: "deleted successfully" }, { status: 200 });
  return Response.json({message:"deletion failed"},{status:404})
}
