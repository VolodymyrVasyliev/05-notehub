import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
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

  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedValue(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, debouncedValue],
    queryFn: () => fetchNotes(currentPage, debouncedValue),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={inputValue} onSearch={handleSearchChange} />

          {totalPages > 1 && (
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
