import { AnyAction } from "redux";
import { PageSettingsState } from "../types/pageSettings";

const pageSettingsReducer = (
  state: PageSettingsState = { isDarkMode: false },
  action: AnyAction
) => {
  switch (action.type) {
    case "UPDATE_DARK_MODE":
      return {
        ...state,
        isDarkMode: action.payload,
      };
    default:
      return state;
  }
};

export default pageSettingsReducer;
