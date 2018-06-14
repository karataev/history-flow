import React from 'react';
import PropTypes from 'prop-types';

export default class GroupEditForm extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };

  state = {
    value: '',
  };

  onChange = e => {
    this.setState({value: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.appStore.addEntityToGroup(this.props.group.id, Number(this.state.value));
    this.setState({value: ''});
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.onChange}
          required
          placeholder="id"
        />
        <input
          type="submit"
          value="Добавить"
        />
      </form>
    )
  }
}
