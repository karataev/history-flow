import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import EntityEditForm from './EntityEditForm';

const Root = styled.div`
margin-top: 10px;
`;

class Toolbar extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddingEntity: false,
    }
  }

  onStartAdd = () => {
    this.setState({isAddingEntity: true});
  };

  onCancelAdd = () => {
    this.setState({isAddingEntity: false});
  };

  onAdd = entity => {
    this.props.appStore.addEntity(entity);
    this.setState({isAddingEntity: false});
  };

  onCancelEdit = () => {
    this.props.appStore.cancelEditEntity();
  };

  onEdit = (entity) => {
    this.props.appStore.addEntity(entity);
    this.props.appStore.cancelEditEntity();
  };

  render() {
    const {appStore} = this.props;
    const {isAddingEntity} = this.state;

    return (
      <Root>
        <div>
          <button
            onClick={this.onStartAdd}
          >Добавить</button>
          <button
            onClick={appStore.save}
          >Сохранить</button>
        </div>
        {isAddingEntity && (
          <EntityEditForm
            appStore={appStore}
            onCancel={this.onCancelAdd}
            onSuccess={this.onAdd}
          />
        )}
        {appStore.editEntity && (
          <EntityEditForm
            appStore={appStore}
            onCancel={this.onCancelEdit}
            onSuccess={this.onEdit}
          />
        )}
      </Root>
    )
  }
}

export default observer(Toolbar);