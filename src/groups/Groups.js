import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import GroupFull from "./GroupFull";
import GroupShort from "./GroupShort";

const Root = styled.div`
display: flex;
`;

const GroupFullContainer = styled.div`
display: flex;
`;

class Groups extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
  };

  render() {
    const {appStore} = this.props;

    return (
      <Root>
        <div>
          <h3>Все группы</h3>
          {appStore.groups.map(group => (
            <GroupShort
              group={group}
              appStore={appStore}
              key={group.id}
            />
          ))}
        </div>
        <GroupFullContainer>
          {appStore.openedGroups.map(group => (
            <GroupFull
              appStore={appStore}
              group={group}
              key={group.id}
            />
          ))}
          <GroupFull
            appStore={appStore}
            group={appStore.groupAllEntities}
          />
        </GroupFullContainer>
      </Root>
    )
  }
}

export default observer(Groups);
