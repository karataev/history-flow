import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EntityGroup from "./EntityGroup";
import _ from "lodash";

const Root = styled.div`
display: flex;
`;

export default class Groups extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
  };

  render() {
    const {appStore} = this.props;

    return (
      <Root>
        {appStore.groups.map(group => (
          <EntityGroup
            appStore={appStore}
            group={group}
            key={group.id}
          />
        ))}
        <EntityGroup
          appStore={appStore}
          group={appStore.groupAllEntities}
        />
      </Root>
    )
  }
}
