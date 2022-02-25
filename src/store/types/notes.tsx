export type Note = {
  docId?: string;
  id: string;
  content: string;
  color: string;
  dateCreated: string;
};

export type NotesState = {
  list: Note[];
};
