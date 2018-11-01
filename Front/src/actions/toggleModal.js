import { SHOW_MODAL, HIDE_MODAL, TOGGLE_MODAL } from "./constants";

export function openModal() {
  return {
    type: SHOW_MODAL,
    payload: "Open modal..."
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
    payload: "Hide modal..."
  };
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
    payload: "Toggle modal..."
  };
}
