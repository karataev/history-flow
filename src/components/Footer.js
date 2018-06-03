import React from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';

const Root = styled.div`
margin-top: 10px;
`;

const Footer = observer(({appStore}) => {
  return (
    <Root>
      <button
        onClick={appStore.startAddEntity}
      >Добавить личность</button>
      <button
        onClick={appStore.save}
      >Сохранить</button>
    </Root>
  )
});

export default Footer;