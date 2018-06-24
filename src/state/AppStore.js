import {decorate, observable, computed} from 'mobx';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import GroupItem from "./GroupItem";

function getNextId(collection) {
  const ids = collection.map(item => item.id);
  return Math.max(...ids) + 1;
}

export default class AppStore {
  entities = [];
  isAddingEntity = false;
  editEntity = null;
  groups = [];

  constructor(data) {
    this.entities = data.entities;
    this.groups = data.groups.map(group => {
      return new GroupItem(group, this.entities);
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
      let thisEntity = _.find(this.entities, {id: entity.id});
      thisEntity.title = entity.title;
      thisEntity.start = entity.start;
      thisEntity.end = entity.end;
    } else {
      entity.id = getNextId(this.entities);
      this.entities.push(entity);
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

  toggleGroupOpen = group => {
    group.isOpen = !group.isOpen;
    if (group.isOpen) this.selectGroup(group);
  };

  save = () => {
    let state = {
      entities: this.entities,
      groups: this.groups.map(group => {
        return {
          id: group.id,
          title: group.title,
          ids: group.ids,
          isOpen: group.isOpen,
        }
      }),
    };
    let json = JSON.stringify(state, null, 2);
    console.log(json);
    copy(json);
  };

  get graphEntities() {
    let sorted = _.sortBy(this.entities, 'start');
    return sorted.filter(entity => entity.visible);
  }

  get groupAllEntities() {
    let allIds = this.entities.map(entity => entity.id);
    return new GroupItem({id: -1, title: 'Весь список', ids: allIds}, this.entities);
  }

  get worldStart() {
    let result = Number.MAX_VALUE;
    this.entities.forEach(entity => {
      if (!entity.visible) return;
      if (entity.start < result) result = entity.start;
    });
    if (result === Number.MAX_VALUE) result = 0;
    return result;
  }

  get worldEnd() {
    let result = Number.MIN_VALUE;
    this.entities.forEach(entity => {
      if (!entity.visible) return;
      if (entity.end > result) result = entity.end;
    });
    if (result === Number.MIN_VALUE) result = 0;
    return result;
  }

  get openedGroups() {
    return this.groups.filter(group => group.isOpen);
  }

}

decorate(AppStore, {
  entities: observable,
  isAddingEntity: observable,
  editEntity: observable,
  groups: observable,

  worldStart: computed,
  worldEnd: computed,
  graphEntities: computed,
  groupAllEntities: computed,
  openedGroups: computed,
});
