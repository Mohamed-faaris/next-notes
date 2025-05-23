"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import { useRef, useState } from "react";
import { codeBlock } from "@blocknote/code-block";
import Link from "next/link";




export default function Editor({noteId,initialContent}:{noteId:string ,initialContent:any }) {
  // Fix timer type for browser
  const timer = useRef<number | null>(null);
  const content = JSON.parse(initialContent.content);
  console.log("editor", noteId,content);
  

  const editor = useCreateBlockNote({
    codeBlock,
    // dictionary: {
    //   ...en,
    //   ai: aiEn, // add default translations for the AI extension
    // },
    // extensions: [
    //   createAIExtension({
    //     model,
    //   }),
    // ],
    initialContent: content,
    
  });

  function saveToApi(blocks: PartialBlock[]) {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => {
      fetch(`/api/notes/${noteId}`, {
        method: "POST",
        body: JSON.stringify({
          content: JSON.stringify(blocks),
        }),
      });
    }, 1000);
  }

  // Only render BlockNoteView if editor is defined (guaranteed by above checks)
  return (
    <BlockNoteView
      editor={editor}
      onChange={() => {
        saveToApi(editor.document);
      }}
    />
  );
}
