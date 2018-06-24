import React from 'react';
import PropTypes from 'prop-types';

import notification from '../state/notification';

export default class GroupEditForm extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };

  state = {
    addValue: '',
    removeValue: '',
  };

  onChangeAdd = e => {
    this.setState({addValue: e.target.value});
  };

  onChangeRemove = e => {
    this.setState({removeValue: e.target.value});
  };

  onAdd = e => {
    e.preventDefault();

    let entityId = Number(this.state.addValue);
    let entity = this.props.appStore.getEntityById(entityId);
    if (!entity) {
      notification.error(`Объект с ID ${entityId} не найден`);
      return;
    }
    this.props.appStore.addEntityToGroup(this.props.group.id, entityId);
    this.setState({addValue: ''});
  };

  onRemove = e => {
    e.preventDefault();

    let entityId = Number(this.state.removeValue);
    let entity = this.props.appStore.getEntityById(entityId);
    if (!entity) {
      notification.error(`Объект с ID ${entityId} не найден`);
      return;
    }
    this.props.appStore.removeEntityFromGroup(this.props.group.id, entityId);
    this.setState({removeValue: ''});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onAdd}>
          <input
            type="text"
            value={this.state.addValue}
            onChange={this.onChangeAdd}
            required
            placeholder="id"
          />
          <input
            type="submit"
            value="Добавить"
          />
        </form>
        <form onSubmit={this.onRemove}>
          <input
            type="text"
            value={this.state.removeValue}
            onChange={this.onChangeRemove}
            required
            placeholder="id"
          />
          <input
            type="submit"
            value="Удалить"
          />
        </form>
      </div>
    )
  }
}
