export default function(previousState = [], action) {
  console.log(action);
  switch (action.type) {
    case "GET_LOCATIONS":
      return {
        all: action.payload
      };
    default:
      return previousState;
  }
}
