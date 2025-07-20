import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteServise";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../../NoteForm/NoteForm";
import type { Note } from "../../types/note";

function App() {
  const { data, isLoading, isError } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log(data, isLoading, isError);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* <NoteList note={data} /> */}
          <SearchBox />
          {/* Пагінація */}
          {isModalOpen && (
            <Modal onClose={() => closeModal()}>
              <NoteForm onSuccess={closeModal} />
            </Modal>
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
      </div>
    </>
  );
}

export default App;
