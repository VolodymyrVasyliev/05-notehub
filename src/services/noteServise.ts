import axios from "axios";
import type { Note, } from "../types/note";

export interface FetchNotesResponse {
  data: Note[];
  page: number;
  perPage: number;
  TotalPages: number;
  TotalItems: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: params.page,
      
      },
    }
  );

  return response.data;
}

// export interface CreateNoteParams {
//   titla: string;
//   content: string;
//   tag: NoteTag
// }

// export const createNote = async (note: CreateNoteParams): Promise<Note[]> {
//   const token = import.meta.env.VITE_NOTEHUB_TOKEN
//   const response = await axios.post<Note>(
//     "https://notehub-public.goit.study/api/notes",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
        
      
//       },
//     }
//   );
//   return response.data
// }

// export const deleteNote = async (id: string): Promise<void> => {
//   const token = import.meta.env.VITE_NOTEHUB_TOKEN;
//   await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };