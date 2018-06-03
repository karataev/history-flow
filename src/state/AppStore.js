import {decorate, observable, computed} from 'mobx';
import _ from 'lodash';
import copy from 'copy-to-clipboard';

function getNextId(collection) {
  const ids = collection.map(item => item.id);
  return Math.max(...ids) + 1;
}

export default class AppStore {
  worldStart = 1000;
  worldEnd = 2000;
  segments = [];
  groups = [];
  isAddingEntity = false;
  editEntity = null;

  constructor(data) {
    this.worldStart = data.worldStart;
    this.worldEnd = data.worldEnd;
    this.segments = data.segments;
    this.groups = data.groups;
  }

  startAddEntity = () => {
    this.isAddingEntity = true;
  };

  cancelAddEntity = () => {
    this.isAddingEntity = false;
    this.editEntity = null;
  };

  startEditEntity = entity => {
    this.editEntity = entity;
  };

  addEntity(entity) {
    if (entity.id) {
      let thisEntity = _.find(this.segments, {id: entity.id});
      thisEntity.title = entity.title;
      thisEntity.start = entity.start;
      thisEntity.end = entity.end;
    } else {
      entity.id = getNextId(this.segments);
      this.segments.push(entity);
    }
    this.cancelAddEntity();
  }

  save = () => {
    let state = {
      worldStart: this.worldStart,
      worldEnd: this.worldEnd,
      segments: this.segments,
      groups: this.groups,
    };
    let json = JSON.stringify(state, null, 2);
    console.log(json);
    copy(json);
  };

  get graphEntities() {
    return _.sortBy(this.segments, 'start');
  }
}

decorate(AppStore, {
  worldStart: observable,
  worldEnd: observable,
  segments: observable,
  groups: observable,
  isAddingEntity: observable,
  editEntity: observable,
  graphEntities: computed,
});
