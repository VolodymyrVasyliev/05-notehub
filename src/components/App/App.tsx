import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteServise";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [inputVailue, setInputeValue] = useState("");

  const updeteSearch = useDebouncedCallback((newSearchQuery: string) => {
    setInputeValue(newSearchQuery);
    setCurrentPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, inputVailue],
    queryFn: () => fetchNotes(currentPage, inputVailue),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={inputVailue} onSearch={updeteSearch} />

          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}

          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>

        {isLoading && <p className={css.loading}>loading notes...</p>}
        {isError && <p className={css.error}>Server error. Sorry!</p>}
        {data && !isLoading && <NoteList notes={data.notes} />}

        {isModalOpen && (
          <Modal onClose={() => closeModal()}>
            <NoteForm onCloseModal={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
