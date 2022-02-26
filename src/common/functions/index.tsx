import { notesColorSelection } from "../constants/colors";

export const generateRandomId = (): string => {
  const newId = `${Date.now().toString(36).toUpperCase()}${Math.floor(
    Math.random() * 123
  )}`;

  return newId;
};

export const getPageColors = (isDarkMode: boolean) => {
  return {
    sidebar: isDarkMode ? "#0D2132" : "#F1F1F1",
    body: isDarkMode ? "#001528" : "#FFF",
    header: isDarkMode ? "#001528E8" : "#FFFFFFE8",
    text: isDarkMode ? "text-white" : "",
  };
};

export const getColorDescription = (colorValue: string) => {
  return notesColorSelection.find((color) => color.value === colorValue)
    ?.description;
};
