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

  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    }
  }

  onFilterChange = e => {
    this.setState({filter: e.target.value});
  };

  getFilteredEntities() {
    const {group} = this.props;
    const {filter} = this.state;
    if (!filter) return group.entities;

    return group.entities.filter(entity => {
      return entity.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
    });
  }

  render() {
    const {group, appStore} = this.props;
    const entities = this.getFilteredEntities();

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
        <div>
          <input
            type="text"
            placeholder="Фильтр"
            value={this.state.filter}
            onChange={this.onFilterChange}
          />
        </div>
        <ItemsContainer>
          {entities.map(entity => (
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
