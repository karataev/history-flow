import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import Segment from "./Segment";

const Root = styled.div`
position: relative;
margin-top: 20px;
margin-bottom: 20px;
`;

const LineGraph = styled.div`
height: 2px;
background: #ddd;
`;

const onClick = (appStore, segment) => {
  appStore.startEditEntity(segment);
};

const EntityLine = observer(({appStore, segment}) => {

  const {worldStart, worldEnd} = appStore;
  const worldLength = worldEnd - worldStart;
  const startPercent = Math.round((segment.start - worldStart) / worldLength * 100);
  const endPercent = 100 - Math.round((segment.end - worldStart) / worldLength * 100);

  return (
    <Root onClick={() => onClick(appStore, segment)}>
      <LineGraph/>
      <Segment
        title={segment.title}
        startPercent={startPercent}
        endPercent={endPercent}

      />
    </Root>
  )
});

export default EntityLine;