"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { useRef, useEffect, useState } from "react";


export default function Editor() {
	const initEditor: PartialBlock[] = [
    {
      type: "paragraph",
      content: "Welcome to this demo!",
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Blocks:",
          styles: { bold: true },
        },
      ],
    },
    {
      type: "paragraph",
      content: "Paragraph",
    },
    {
      type: "heading",
      content: "Heading",
    },
    {
      type: "quote",
      content: "Quote",
    },
    {
      type: "bulletListItem",
      content: "Bullet List Item",
    },
    {
      type: "numberedListItem",
      content: "Numbered List Item",
    },
    {
      type: "checkListItem",
      content: "Check List Item",
    },
    {
      type: "codeBlock",
      props: { language: "javascript" },
      content: "console.log('Hello, world!');",
    },
    {
      type: "table",
      content: {
        type: "tableContent",
        rows: [
          {
            cells: ["Table Cell", "Table Cell", "Table Cell"],
          },
          {
            cells: ["Table Cell", "Table Cell", "Table Cell"],
          },
          {
            cells: ["Table Cell", "Table Cell", "Table Cell"],
          },
        ],
      },
    },
    {
      type: "file",
    },
    {
      type: "image",
      props: {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
        caption:
          "From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      },
    },
    {
      type: "video",
      props: {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        caption:
          "From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      },
    },
    {
      type: "audio",
      props: {
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        caption:
          "From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
      },
    },
    {
      type: "paragraph",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Inline Content:",
          styles: { bold: true },
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Styled Text",
          styles: {
            bold: true,
            italic: true,
            textColor: "red",
            backgroundColor: "blue",
          },
        },
        {
          type: "text",
          text: " ",
          styles: {},
        },
        {
          type: "link",
          content: "Link",
          href: "https://www.blocknotejs.org",
        },
      ],
    },
    {
      type: "paragraph",
    },
  ];
  const editor = BlockNoteEditor.create({ initialContent: initEditor });   
	const timer = useRef<NodeJS.Timeout | null>(null);
	function save() {
		console.log("saving");
		if(timer.current) {
			clearTimeout(timer.current);
		}
		timer.current = setTimeout(()=>
		{
			console.log("saved");
		},1000)
	}

	return <BlockNoteView editor={editor} onChange = {save}/>;
}



