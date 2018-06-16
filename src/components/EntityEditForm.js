import React from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

const Root = styled.div`
padding: 10px;
`;

class EntityEditForm extends React.Component {

  constructor(props) {
    super(props);

    const {editEntity} = this.props.appStore;
    this.state = {
      title: editEntity ? editEntity.title : '',
      start: editEntity ? editEntity.start : 0,
      end: editEntity ? editEntity.end : 0,
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
    this.props.appStore.addEntity(result);
  };

  onCancel = e => {
    this.props.appStore.cancelAddEntity();
  };

  render() {
    const {editEntity} = this.props.appStore;

    return (
      <Root>
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              ref={el => this.nameEl = el}
              type="text"
              placeholder="Имя"
              value={this.state.title}
              onChange={this.onTitleChange}
            />
            <input
              type="number"
              placeholder="Год рождения"
              value={this.state.start}
              onChange={this.onStartChange}
            />
            <input
              type="number"
              placeholder="Год смерти"
              value={this.state.end}
              onChange={this.onEndChange}
            />
          </div>
          <div>
            <button type="submit">
              {editEntity ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={this.onCancel}
            >Отмена</button>
          </div>
        </form>
      </Root>
    )
  }
}

export default observer(EntityEditForm);