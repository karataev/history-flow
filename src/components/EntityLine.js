import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import EntitySegment from "./EntitySegment";

const Root = styled.div`
position: relative;
margin-top: 20px;
margin-bottom: 20px;
`;

const LineGraph = styled.div`
height: 2px;
background: #ddd;
`;

const onClick = (appStore, entity) => {
  appStore.startEditEntity(entity);
};

const EntityLine = observer(({appStore, entity}) => {

  const {worldStart, worldEnd} = appStore;
  const worldLength = worldEnd - worldStart;
  const startPercent = Math.round((entity.start - worldStart) / worldLength * 100);
  const endPercent = 100 - Math.round((entity.end - worldStart) / worldLength * 100);

  return (
    <Root onClick={() => onClick(appStore, entity)}>
      <LineGraph/>
      <EntitySegment
        entity={entity}
        startPercent={startPercent}
        endPercent={endPercent}
      />
    </Root>
  )
});

export default EntityLine;