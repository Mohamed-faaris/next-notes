"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { codeBlock } from "@blocknote/code-block";
import Link from "next/link";

async function loadFromApi() {
  const res = await fetch("/api/notes/test");
  if (!res.ok) return undefined;
  const data = await res.json();  
    try {
      return JSON.parse(data[0].content) as PartialBlock[];
    } catch {
      return undefined;
    }
}

export default function Editor() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    loadFromApi().then((content) => {
      setInitialContent(content);
    });

  }, []);

  const editor = useMemo(() => {
    if (initialContent === "loading") return undefined;
    // Fallback to some default content if API returns nothing
    return BlockNoteEditor.create({
      initialContent: initialContent || [
        { type: "paragraph", content: "Welcome to this demo!" },
      ],codeBlock
    });
  }, [initialContent]);

  if (!editor) return <div>404 Note Not Found<Link href={"/dashboard"}>new note</Link></div>;
  function saveToApi(blocks: PartialBlock[]) {
    console.log("saving");
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fetch("/api/notes/test", {
        method: "POST",
        body: JSON.stringify({
          content: JSON.stringify(blocks),
        }),
      });
      console.log("saved");
    }, 1000);
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToApi(editor.document);
      }}
    />
  );
}
