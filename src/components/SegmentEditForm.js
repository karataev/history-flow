import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
padding: 10px;
`;


export default class SegmentEditForm extends React.Component {

  static propTypes = {
    segment: PropTypes.object,
    onSuccess: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {segment} = props;
    this.state = {
      title: segment ? segment.title : '',
      start: segment ? segment.start : 0,
      end: segment ? segment.end : 0,
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
      title: this.state.title,
      start: Number(this.state.start),
      end: Number(this.state.end),
      visible: true,
    };
    if (this.props.segment) {
      result.id = this.props.segment.id;
    }
    this.props.onSuccess(result);
  };

  render() {
    const {segment} = this.props;

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
              {segment ? 'Сохранить' : 'Добавить'}
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
