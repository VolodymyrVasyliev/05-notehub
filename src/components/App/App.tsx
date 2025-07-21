import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteServise";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../../NoteForm/NoteForm";
import type { Note } from "../../types/note";
// import ReactPaginate from "react-paginate";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: fetchNotes,
    placeholderData: keepPreviousData,
    
  });
  
  // const totalPages = data?.totalPages ?? 0;


  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {data && !isLoading && <NoteList notes={data.notes} />}
          <SearchBox />

          {/* <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
            renderOnZeroPageCount={null}
          /> */}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
          {isModalOpen && (
            <Modal onClose={() => closeModal()}>
              <NoteForm onSuccess={closeModal} />
            </Modal>
          )}
        </header>
      </div>
    </>
  );
}

export default App;
