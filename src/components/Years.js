import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

const YearContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const Year = styled.div`
padding: 10px;
`;

const Years = observer(({appStore}) => {
  return (
    <YearContainer>
      <Year>{appStore.worldStart}</Year>
      <Year>{appStore.worldEnd}</Year>
    </YearContainer>
  )
});

export default Years;