import { Dispatch } from "redux";

export const updatePageMode = (isDarkMode: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "UPDATE_DARK_MODE",
      payload: isDarkMode,
    });
  };
};
