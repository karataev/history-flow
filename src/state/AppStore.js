import {decorate, observable, computed} from 'mobx';
import _ from 'lodash';

import GroupItem from "./GroupItem";
import storage from './storage';
import notification from './notification';


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
    let storageState = storage.load();
    let groupsData;
    if (storageState) {
      this.entities = storageState.entities;
      groupsData = storageState.groups;
    } else {
      this.entities = data.entities;
      groupsData = data.groups;
    }

    this.groups = groupsData.map(group => {
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
    storage.save(this.entities, this.groups);
  };

  getEntityById(id) {
    return _.find(this.entities, {id});
  }

  selectGroup = group => {
    group.entities.forEach(entity => entity.visible = true);
    storage.save(this.entities, this.groups);
  };

  clearGroup = group => {
    group.entities.forEach(entity => entity.visible = false);
    storage.save(this.entities, this.groups);
  };

  addEntityToGroup = (groupId, entityId) => {
    let groupItem = _.find(this.groups, {id: groupId});
    groupItem.addEntityId(entityId);
    storage.save(this.entities, this.groups);
  };

  removeEntityFromGroup = (groupId, entityId) => {
    let groupItem = _.find(this.groups, {id: groupId});
    groupItem.removeEntityId(entityId);
    let entity = this.getEntityById(entityId);
    entity.visible = false;
    storage.save(this.entities, this.groups);
  };

  toggleGroupOpen = group => {
    group.isOpen = !group.isOpen;
    if (group.isOpen) this.selectGroup(group);
    else this.clearGroup(group);
    storage.save(this.entities, this.groups);
  };

  save = () => {
    storage.copyToClipboard(this.entities, this.groups);
    notification.success('Скопировано в буфер обмена');
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
