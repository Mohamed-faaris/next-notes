"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useCreateBlockNote } from "@blocknote/react";
import { useRef, useState } from "react";
import { codeBlock } from "@blocknote/code-block";
import Link from "next/link";




export default function Editor({noteId,initialContent}:{noteId:string ,initialContent: PartialBlock[] }) {
  // Fix timer type for browser
  const timer = useRef<number | null>(null);
  console.log("editor", noteId, initialContent);
  // const editor = useCreateBlockNote({initialContent: initialContent});
  //const editor = BlockNoteEditor.create(initialContent)
  const editor = useCreateBlockNote({
    // dictionary: {
    //   ...en,
    //   ai: aiEn, // add default translations for the AI extension
    // },
    // // Register the AI extension
    // extensions: [
    //   createAIExtension({
    //     model,
    //   }),
    // ],
    // We set some initial content for demo purposes
    initialContent: [
      {
        type: "heading",
        props: {
          level: 1,
        },
        content: "Open source software",
      },
      {
        type: "paragraph",
        content:
          "Open source software refers to computer programs whose source code is made available to the public, allowing anyone to view, modify, and distribute the code. This model stands in contrast to proprietary software, where the source code is kept secret and only the original creators have the right to make changes. Open projects are developed collaboratively, often by communities of developers from around the world, and are typically distributed under licenses that promote sharing and openness.",
      },
      {
        type: "paragraph",
        content:
          "One of the primary benefits of open source is the promotion of digital autonomy. By providing access to the source code, these programs empower users to control their own technology, customize software to fit their needs, and avoid vendor lock-in. This level of transparency also allows for greater security, as anyone can inspect the code for vulnerabilities or malicious elements. As a result, users are not solely dependent on a single company for updates, bug fixes, or continued support.",
      },
      {
        type: "paragraph",
        content:
          "Additionally, open development fosters innovation and collaboration. Developers can build upon existing projects, share improvements, and learn from each other, accelerating the pace of technological advancement. The open nature of these projects often leads to higher quality software, as bugs are identified and fixed more quickly by a diverse group of contributors. Furthermore, using open source can reduce costs for individuals, businesses, and governments, as it is often available for free and can be tailored to specific requirements without expensive licensing fees.",
      },
    ],
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
