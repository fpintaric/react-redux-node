import { FILE_SELECTED } from "./constants";

export function fileSelect(file) {
  return {
    type: FILE_SELECTED,
    payload: file.name
  };
}
