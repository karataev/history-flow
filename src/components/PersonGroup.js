import React from 'react';
import PropTypes from 'prop-types';
import PersonGroupItem from "./PersonGroupItem";
import styled from 'styled-components';

const Root = styled.div`
margin-top: 10px;
border: 1px solid #999;
padding: 10px;
`;

const ButtonsContainer = styled.div`
margin-bottom: 10px;
`;

export default class PersonGroup extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    persons: PropTypes.array.isRequired,
    onPersonToggle: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
  };

  render() {
    const {title, persons} = this.props;

    return (
      <Root>
        <h3>{title}</h3>
        <ButtonsContainer>
          <button
            onClick={this.props.onSelectAll}
          >Выделить все</button>
          <button
            onClick={this.props.onClearAll}
          >Сбросить все</button>
        </ButtonsContainer>
        <div>
          {persons.map(person => (
            <PersonGroupItem
              person={person}
              onToggle={this.props.onPersonToggle}
              key={person.id}
            >{person.title}</PersonGroupItem>
          ))}
        </div>
      </Root>
    )
  }
}
