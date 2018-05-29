import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
margin-top: 10px;
`;

export default class Footer extends React.Component {

  static propTypes = {
    onAddLine: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Root>
        <button
          onClick={this.props.onAddLine}
        >Добавить линию</button>
        <button
          onClick={this.props.onSave}
        >Сохранить</button>
      </Root>
    )
  }
}
