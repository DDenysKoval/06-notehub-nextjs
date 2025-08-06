// import css from "./App.module.css"
import { fetchNotes } from "@/lib/api"
import NotesClient from "./Notes.client"

export default async function Notes() {
  const initialData = await fetchNotes("", 1);

  return (
    <main>
      <NotesClient initialData={initialData}/>
    </main>
  )
}