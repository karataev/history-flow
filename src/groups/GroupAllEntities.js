import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import EntityGroupItem from "./EntityGroupItem";

const Root = styled.div`
margin-top: 10px;
border: 1px solid #999;
padding: 10px;
position: relative;
`;

const ButtonsContainer = styled.div`
margin-bottom: 10px;
`;

const ItemsContainer = styled.div`
max-height: 500px;
overflow: auto;
`;

class GroupAllEntities extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };

  render() {
    const {group, appStore} = this.props;

    return (
      <Root>
        <h3>{group.title}</h3>
        <ButtonsContainer>
          <button
            onClick={() => appStore.selectGroup(group)}
          >Показать всех</button>
          <button
            onClick={() => appStore.clearGroup(group)}
          >Скрыть всех</button>
        </ButtonsContainer>
        <ItemsContainer>
          {group.entities.map(entity => (
            <EntityGroupItem
              appStore={appStore}
              entity={entity}
              key={entity.id}
            />
          ))}
        </ItemsContainer>
      </Root>
    )
  }
}

export default observer(GroupAllEntities);
