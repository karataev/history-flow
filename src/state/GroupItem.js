import {decorate, observable, computed} from 'mobx';
import _ from "lodash";

export default class GroupItem {

  ids = [];

  constructor({id, title, ids, isOpen}, allEntities) {
    this.id = id;
    this.title = title;
    this.ids = ids;
    this.allEntities = allEntities;
    this.isOpen = isOpen || false;
  }

  addEntityId(entityId) {
    this.ids.push(entityId);
  }

  get entities() {
    let result =  this.ids.map(id => _.find(this.allEntities, {id}));
    return result;
  }
}

decorate(GroupItem, {
  ids: observable,
  isOpen: observable,
  entities: computed,
});