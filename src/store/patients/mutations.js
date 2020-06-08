import initial from "./state";

function reset(state) {

  const initialState = initial();

  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  });
}

export default {
  reset
}
