import {decorate, observable, computed} from 'mobx';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import GroupItem from "./GroupItem";

function getNextId(collection) {
  const ids = collection.map(item => item.id);
  return Math.max(...ids) + 1;
}

export default class AppStore {
  worldStart = 1000;
  worldEnd = 2000;
  segments = [];
  isAddingEntity = false;
  editEntity = null;
  groups = [];

  constructor(data) {
    this.worldStart = data.worldStart;
    this.worldEnd = data.worldEnd;
    this.segments = data.segments;
    this.groups = data.groups.map(group => {
      return new GroupItem(group, this.segments);
    });
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

  toggleEntity = entity => {
    entity.visible = !entity.visible;
  };

  selectGroup = group => {
    group.entities.forEach(entity => entity.visible = true);
  };

  clearGroup = group => {
    group.entities.forEach(entity => entity.visible = false);
  };

  addEntityToGroup = (groupId, entityId) => {
    let groupItem = _.find(this.groups, {id: groupId});
    groupItem.addEntityId(entityId);
  };

  save = () => {
    let state = {
      worldStart: this.worldStart,
      worldEnd: this.worldEnd,
      segments: this.segments,
      groups: this.groups.map(group => {
        return {
          id: group.id,
          title: group.title,
          ids: group.ids,
        }
      }),
    };
    let json = JSON.stringify(state, null, 2);
    console.log(json);
    copy(json);
  };

  get graphEntities() {
    let sorted = _.sortBy(this.segments, 'start');
    return sorted.filter(entity => entity.visible);
  }

  get groupAllEntities() {
    let allIds = this.segments.map(entity => entity.id);
    return new GroupItem({id: -1, title: 'Весь список', ids: allIds}, this.segments);
  }
}

decorate(AppStore, {
  worldStart: observable,
  worldEnd: observable,
  segments: observable,
  isAddingEntity: observable,
  editEntity: observable,
  groups: observable,
  graphEntities: computed,
  groupAllEntities: computed,
});
