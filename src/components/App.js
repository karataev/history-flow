import React, { Component } from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import Toolbar from "./Toolbar";
import EntityEditForm from "./EntityEditForm";
import Groups from "../groups/Groups";
import Years from './Years';
import Graph from './Graph';

const Root = styled.div`
`;

class App extends Component {

  render() {
    const {appStore} = this.props;

    return (
      <Root>
        <Toolbar appStore={appStore} />
        {appStore.isAddingEntity && <EntityEditForm appStore={appStore} />}
        {appStore.editEntity && <EntityEditForm appStore={appStore} />}
        <Years appStore={appStore} />
        <Graph appStore={appStore} />
        <Groups appStore={appStore}/>
      </Root>
    );
  }
}

export default observer(App);
