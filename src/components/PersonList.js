import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from "./PersonListItem";

const Root = styled.div`
margin-top: 10px;
border: 1px solid #999;
padding: 10px;
`;

const ButtonsContainer = styled.div`
margin-bottom: 10px;
`;

export default class PersonList extends React.Component {

  static propTypes = {
    persons: PropTypes.array.isRequired,
    onPersonToggle: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onClearAll: PropTypes.func.isRequired,
  };

  render() {
    const {persons} = this.props;

    return (
      <Root>
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
            <PersonListItem
              person={person}
              onToggle={this.props.onPersonToggle}
              key={person.id}
            />
          ))}
        </div>
      </Root>
    )
  }
}
