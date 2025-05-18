import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import crypto from "crypto";

export const users = sqliteTable("users", {
  uuid: text("uuid")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),

  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

export const notes = sqliteTable("notes", {
  uuid: text("uuid")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  content: text("content").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => users.uuid, { onDelete: "cascade" }),

  createdAt: text("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});

// Relations

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
}));

export const noteRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.uuid],
  }),
}));
