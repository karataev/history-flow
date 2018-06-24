import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {observer} from 'mobx-react';

const Root = styled.div`
padding: 10px;
`;

class EntityEditForm extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {editEntity} = this.props.appStore;
    this.state = {
      title: editEntity ? editEntity.title : '',
      start: editEntity ? editEntity.start : '',
      end: editEntity ? editEntity.end : '',
      id: editEntity ? editEntity.id : null,
    }
  }

  componentDidMount() {
    this.nameEl.focus();
  }

  onTitleChange = e => {
    this.setState({
      title: e.target.value,
    })
  };

  onStartChange = e => {
    this.setState({
      start: e.target.value,
    })
  };

  onEndChange = e => {
    this.setState({
      end: e.target.value,
    })
  };

  onSubmit = e => {
    e.preventDefault();

    let result = {
      id: this.state.id,
      title: this.state.title,
      start: Number(this.state.start),
      end: Number(this.state.end),
      visible: true,
    };
    this.props.onSuccess(result);
    this.setState({
      title: '',
      start: '',
      end: '',
      id: null,
    })
  };

  render() {
    return (
      <Root>
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              ref={el => this.nameEl = el}
              type="text"
              placeholder="Имя"
              required
              value={this.state.title}
              onChange={this.onTitleChange}
            />
            <input
              type="text"
              placeholder="Начало"
              required
              value={this.state.start}
              onChange={this.onStartChange}
            />
            <input
              type="text"
              placeholder="Конец"
              required
              value={this.state.end}
              onChange={this.onEndChange}
            />
          </div>
          <div>
            <button type="submit">
              Ок
            </button>
            <button
              type="button"
              onClick={this.props.onCancel}
            >Отмена</button>
          </div>
        </form>
      </Root>
    )
  }
}

export default observer(EntityEditForm);