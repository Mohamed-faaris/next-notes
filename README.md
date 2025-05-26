# Next Notes

Next Notes is a modern, full-stack note-taking web application built with the T3 Stack (Next.js, Drizzle ORM, NextAuth.js, Tailwind CSS, and more). It features a rich text editor, user authentication, and a dashboard for managing your notes.

## Features

- **User Authentication**: Sign up and sign in securely using email and password (NextAuth.js with Drizzle ORM).
- **Dashboard**: View, create, and manage your notes from a central dashboard. See all your notes at a glance.
- **Rich Text Editor**: Write notes with formatting, code blocks, lists, headings, quotes, checklists, images, audio, and more (powered by BlockNote and Tiptap). Supports inline styles, links, and media embeds.
- **AI Integration**: (Optional) Connect to AI models for enhanced note-taking features, such as content suggestions or summarization (see `src/server/AI/ai.ts`).
- **Persistent Storage**: Notes and users are stored in a SQLite database using Drizzle ORM. All notes are associated with the authenticated user.
- **Auto-Save**: Notes are automatically saved as you type, reducing the risk of data loss.
- **Note Editing**: Edit note titles and content. All changes are synced to the database.
- **Note Organization**: Notes are listed by title. 
- **Responsive UI**: Built with Tailwind CSS for a modern, mobile-friendly experience.
- **Secure API**: All note operations are protected by authentication. Unauthorized users cannot access or modify notes.
- **Extensible**: Easily add new features, such as sharing, exporting, or collaborative editing.

## Getting Started

1. **Install dependencies**:
   ```cmd
   pnpm install
   ```
2. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in the required values.
3. **Run the development server**:
   ```cmd
   pnpm dev
   ```
4. **Open your browser** at [http://localhost:3000](http://localhost:3000)

## Usage

- Sign up for a new account or sign in.
- Create a new note from the dashboard by entering a title.
- Click on a note to open and edit it in the rich text editor.
- Your notes are saved automatically and associated with your account.
- Edit note titles directly from the dashboard.
- Add code blocks, checklists, images, audio, and more to your notes.
- (Optional) Use AI features for content suggestions if configured.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [BlockNote](https://blocknotejs.org) & [Tiptap](https://tiptap.dev)
- [SQLite](https://www.sqlite.org/index.html)

## Project Structure

- `src/app/` — Main application pages and API routes
- `src/server/` — Authentication, database, and AI integration logic
- `src/app/components/` — UI components (Editor, Navbar, Sidebar, etc.)
- `src/server/db/schema.ts` — Database schema for users and notes
- `src/utils/initialPlaceholder.ts` — Example content and editor block types

## Environment Variables

See `.env.example` for required environment variables (database URL, auth secret, etc).

## License

MIT
