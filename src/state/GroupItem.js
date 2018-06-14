import {decorate, observable, computed} from 'mobx';
import _ from "lodash";

export default class GroupItem {

  ids = [];

  constructor({id, title, ids}, allEntities) {
    this.id = id;
    this.title = title;
    this.ids = ids;
    this.allEntities = allEntities;
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
  entities: computed,
});