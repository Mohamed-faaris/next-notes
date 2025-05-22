 // adjust to your DB setup file
import { db } from ".";// adjust to where you defined the schema
import { eq } from "drizzle-orm"; // import the operator
import { notes } from "./schema";

// Function using .select()
export async function getNoteTitlesByUserId(userId: string) {
  const titles = await db
    .select({
      title: notes.title,
    })
    .from(notes)
    .where(eq(notes.userId, userId));

  return titles;
}

export async function insertNote(
  title: string,
  userId: string,
): Promise<string> {
  const [insertedNote] = await db
    .insert(notes)
    .values({
      title,
      userId
    })
    .returning({ id: notes.id });
  if (!insertedNote) {
    throw new Error("Failed to insert note");
}  
  return insertedNote.id;
}
