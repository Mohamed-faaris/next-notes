import Editor from "~/app/components/Editor";

export default async function NotePage({params}: {params: Promise<{noteId: string}>}) {
    const {noteId} = await params;
    return(
        <div>
            <Editor noteId = {noteId}/>
        </div>
    )
}