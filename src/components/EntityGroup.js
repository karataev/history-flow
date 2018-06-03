import React from 'react';
import PropTypes from 'prop-types';
import EntityGroupItem from "./EntityGroupItem";
import styled from 'styled-components';

const Root = styled.div`
margin-top: 10px;
border: 1px solid #999;
padding: 10px;
`;

const ButtonsContainer = styled.div`
margin-bottom: 10px;
`;

export default class EntityGroup extends React.Component {

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
          >Выделить все</button>
          <button
            onClick={() => appStore.clearGroup(group)}
          >Сбросить все</button>
        </ButtonsContainer>
        <div>
          {group.entities.map(entity => (
            <EntityGroupItem
              appStore={appStore}
              entity={entity}
              key={entity.id}
            />
          ))}
        </div>
      </Root>
    )
  }
}
