export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  notes: Note[];
  id: string;
  title: string;
  content: string;
  tag: string
}

export interface NewNode {
  title: string;
  content: string;
  tag: NoteTag;
}