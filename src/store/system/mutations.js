import initial from "./state";

function reset(state) {

  const initialState = initial();

  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  });
}

function setActions(state, array) {
  state.actions = array;
}

export default {
  reset,
  setActions
}
