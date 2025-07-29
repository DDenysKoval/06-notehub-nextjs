"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteModal from "@/components/Modal/NoteModal";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "@/app/page.module.css"

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    setPage(1);
  }, [search])

  const totalPages = data?.totalPages ?? 0;

  const handleCreate = () => {
    setIsModalOpen(true)
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    1000
  );

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={ handleChange } />
        {isSuccess && totalPages > 1 && <Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
        <button className={css.button} onClick={handleCreate}>Create note +</button>
      </div>
      {data?.notes !== undefined && <NoteList notes={data?.notes} />}
      {isModalOpen &&
        <NoteModal onClose={handleClose} >
          <NoteForm onClose={handleClose} />
        </NoteModal>
      }
    </div>
  )
}