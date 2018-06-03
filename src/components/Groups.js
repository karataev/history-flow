import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PersonGroup from "./PersonGroup";
import _ from "lodash";

const Root = styled.div`
display: flex;
`;

function getGroupPersons(allPersons, personNames) {
  return personNames.map(name => {
    return _.find(allPersons, {title: name});
  })
}

export default class Groups extends React.Component {

  static propTypes = {
    groups: PropTypes.array.isRequired,
    allPersons: PropTypes.array.isRequired,
    onPersonToggle: PropTypes.func.isRequired,
    onSelectGroup: PropTypes.func.isRequired,
    onClearGroup: PropTypes.func.isRequired,
  };

  render() {
    const {groups, allPersons} = this.props;

    return (
      <Root>
        {groups.map(group => (
          <PersonGroup
            title={group.title}
            persons={getGroupPersons(allPersons, group.names)}
            onPersonToggle={this.props.onPersonToggle}
            onSelectAll={() => this.props.onSelectGroup(group.id)}
            onClearAll={() => this.props.onClearGroup(group.id)}
            key={group.title}
          />
        ))}
      </Root>
    )
  }
}
