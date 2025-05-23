import Editor from "~/app/components/Editor";
import EditorLoader from "~/app/components/EditorLoader";

export default async function NotePage({params}: {params: Promise<{noteId: string}>}) {
    const {noteId} = await params;
    return(
        <div>
            <EditorLoader noteId = {noteId}/>
        </div>
    )
}