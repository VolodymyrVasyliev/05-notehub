import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface fetchNotesResponse {
  notes: Note[];
  totalPages: number;
}



const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  page: number,
  query: string
): Promise<fetchNotesResponse> => {
  const params: Record<string, string | number> = {
    perPage: 10,
    page,
  };

  if (query.trim() !== "") {
    params.search = query;
  }

  const response = await axios.get<fetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return response.data;
};



export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
