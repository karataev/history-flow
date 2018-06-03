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
    let groups = data.groups;
    groups.push({
      id: getNextId(groups),
      title: 'Весь список',
      ids: this.segments.map(segment => segment.id),
    });
    this.groups = groups.map(group => {
      return {
        id: group.id,
        title: group.title,
        entities: group.ids.map(id => _.find(this.segments, {id})),
      }
    })
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

  save = () => {
    let copyGroups = JSON.parse(JSON.stringify(this.groups));
    copyGroups = copyGroups.slice(0, -1);
    let state = {
      worldStart: this.worldStart,
      worldEnd: this.worldEnd,
      segments: this.segments,
      groups: copyGroups.map(group => {
        return {
          id: group.id,
          title: group.title,
          ids: group.entities.map(entity => entity.id),
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
