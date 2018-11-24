import initial from "./state";

function reset(state) {

  const initialState = initial();

  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  });
}

function setActions(state, array) {
  
  state.actions.length = 0;
  
  // attributes list
  const attrList = ['color', 'to']
  // listeners list
  const listList = ['click']

  const directives = [ 'attrs', 'events' ]

  array.forEach ( action => {

    action = Object.assign({}, action);
    const extractor = attr => key => {
      if (action[key]) {
        action[attr][key] = action[key];
        delete action[key];
      }
    };

    directives.forEach( directive => {
      action[directive] = {};
    });

    attrList.forEach( extractor(directives[0]) );
    listList.forEach( extractor(directives[1]) );

    state.actions.push(action);
  })
  console.dir([...state.actions]);
  console.groupEnd();

}

export default {
  reset,
  setActions
}
