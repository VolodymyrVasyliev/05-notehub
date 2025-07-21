import axios from "axios";
import type { Note } from "../types/note";

interface feachNotesResponse {
  note: Note[];
  totalPages: number;
  pege: number;
}

export const fetchNotes = async () => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  const response = await axios.get<feachNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        // page,
        // perPage,
      },
    }
  );

  return response.data;
};
