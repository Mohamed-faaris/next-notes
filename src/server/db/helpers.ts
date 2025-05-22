// adjust to your DB setup file
import { db } from "."; // adjust to where you defined the schema
import { eq, and } from "drizzle-orm"; // add 'and' to imports
import { notes } from "./schema";

// Function using .select()
export async function getNoteTitlesByUserId(userId: string) {
  console.log("Fetching note titles for userId:", userId);
  const titles = await db
    .select({
      title: notes.title,
      id: notes.id,
    })
    .from(notes)
    .where(eq(notes.userId, userId));
  return titles;
}

export async function insertNote(
  title: string,
  userId: string,
): Promise<string> {
  const result = await db.insert(notes).values({
    title,
    userId,
  });

  // Fetch the last inserted note for this user and title
  const insertedNote = await db
    .select({ id: notes.id })
    .from(notes)
    .where(and(eq(notes.title, title), eq(notes.userId, userId)))
    .orderBy(notes.id)
    .limit(1);

  if (!insertedNote || insertedNote.length === 0 || !insertedNote[0]) {
    throw new Error("Failed to insert note");
  }
  return insertedNote[0].id;
}
