import React from 'react';
import PropTypes from 'prop-types';
import EntityGroupItem from "./EntityGroupItem";
import styled from 'styled-components';
import GroupEditForm from "./GroupEditForm";
import {observer} from 'mobx-react';

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

const CloseX = styled.button`
position: absolute;
top: 0;
right: 0;
`;

class GroupFull extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
  };

  onClose = () => {
    this.props.appStore.toggleGroupOpen(this.props.group);
  };

  render() {
    const {group, appStore} = this.props;

    return (
      <Root>
        <h3>{group.title}</h3>
        <CloseX onClick={this.onClose}>X</CloseX>
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
        <GroupEditForm
          appStore={appStore}
          group={group}
        />
      </Root>
    )
  }
}

export default observer(GroupFull);
