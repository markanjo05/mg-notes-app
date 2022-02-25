import { AnyAction } from "redux";
import { NotesState } from "../types/notes";

const notesReducer = (state: NotesState = { list: [] }, action: AnyAction) => {
  switch (action.type) {
    case "UPDATE_NOTES":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default notesReducer;
