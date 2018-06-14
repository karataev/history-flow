import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

import EntityLine from './EntityLine';

const Root = styled.div`
border: 1px solid #666;
overflow: hidden;
`;

class Graph extends React.Component {

  render() {
    const {appStore} = this.props;
    return (
      <Root>
        {appStore.graphEntities.map(entity => (
          <EntityLine
            appStore={appStore}
            entity={entity}
            key={entity.id}
          />
        ))}
      </Root>
    )
  }
}

export default observer(Graph);