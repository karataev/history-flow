import copy from "copy-to-clipboard";


function getState(entities, groups) {
  let state = {
    entities: entities,
    groups: groups.map(group => {
      return {
        id: group.id,
        title: group.title,
        ids: group.ids,
        isOpen: group.isOpen,
      }
    }),
  };
  return JSON.stringify(state, null, 2);
}

function save(entities, groups) {
  let state = this.getState(entities, groups);
  localStorage.setItem('state', state);
}

function copyToClipboard(entities, groups) {
  let state = this.getState(entities, groups);
  console.log(state);
  copy(state);
}

function load() {
  let stateStr = localStorage.getItem('state');
  if (!stateStr) return null;

  let state = JSON.parse(stateStr);
  return {
    entities: state.entities,
    groups: state.groups,
  };
}

export default {
  getState,
  save,
  copyToClipboard,
  load,
}
