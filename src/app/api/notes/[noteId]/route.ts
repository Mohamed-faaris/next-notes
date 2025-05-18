import { db } from "~/server/db";
import { notes } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await params;
  const {content} = await request.json();
  const res = await db
  .update(notes)
  .set({ content: content })
  .where(eq(notes.uuid, noteId));
  console.log("noteId", noteId, "content", content, "res", res);
  return  Response.json({msg:"Note updated"});
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await params;
  const note = await db.select().from(notes).where(eq(notes.uuid, noteId));
  return Response.json(note)
}