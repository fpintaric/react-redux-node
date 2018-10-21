export default function(previousState = { open: false }, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        open: true
      };
    case "HIDE_MODAL":
      return {
        open: false
      };
    case "TOGGLE_MODAL":
      return {
        open: !previousState.open
      };
    default:
      return previousState;
  }
}
