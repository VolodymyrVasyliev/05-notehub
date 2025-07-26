import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface feachNotesResponse {
  notes: Note[];
  totalPages: number;
}
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (page: number, query:string) => {
  const response = await axios.get<feachNotesResponse>(
    'https://notehub-public.goit.study/api/notes',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        perPage: 10,
        page,
        search: query,
      },
    }
  );

  return response.data;
};

export const createNote = async (noteData: NewNote) => {
  const res = await axios.post(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  await axios.delete(`https://notehub-public.goit.study/api/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
