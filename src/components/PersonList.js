import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PersonListItem from "./PersonListItem";

const Root = styled.div`
margin-top: 10px;
`;

export default class PersonList extends React.Component {

  static propTypes = {
    persons: PropTypes.array.isRequired,
    onPersonToggle: PropTypes.func.isRequired,
  };

  render() {
    const {persons} = this.props;

    return (
      <Root>
        {persons.map(person => (
          <PersonListItem
            person={person}
            onToggle={this.props.onPersonToggle}
            key={person.id}
          />
        ))}
      </Root>
    )
  }
}
