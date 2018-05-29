import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
margin-top: 10px;
margin-bottom: 10px;
`;


export default class SegmentEditForm extends React.Component {

  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      start: 0,
      end: 0,
    }
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

  onAdd = () => {
    this.props.onAdd({
      title: this.state.title,
      start: Number(this.state.start),
      end: Number(this.state.end),
    })
  };

  render() {
    return (
      <Root>
        <div>
          <input
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
          <button
            onClick={this.onAdd}
          >Добавить</button>
          <button
            onClick={this.props.onCancel}
          >Отмена</button>
        </div>
      </Root>
    )
  }
}
