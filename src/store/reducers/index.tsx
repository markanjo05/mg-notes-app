import { combineReducers } from "redux";
import { NotesState } from "../types/notes";
import { PageSettingsState } from "../types/pageSettings";
import notesReducer from "./notesReducer";
import pageSettingsReducer from "./pageSettingsReducer";

const allReducers = combineReducers({
  notes: notesReducer,
  pageSettings: pageSettingsReducer,
});

export type RootState = {
  notes: NotesState;
  pageSettings: PageSettingsState;
};

export default allReducers;
