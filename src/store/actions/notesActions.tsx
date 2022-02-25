import { Dispatch } from "redux";
import { Note } from "../types/notes";

export const updateNotes = (newNotes: Note[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "UPDATE_NOTES",
      payload: newNotes,
    });
  };
};
