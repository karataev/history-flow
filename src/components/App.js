import React, { Component } from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-tippy/dist/tippy.css'

import Toolbar from "./Toolbar";
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
        <ToastContainer transition={Slide} />
        <Toolbar appStore={appStore} />
        <Years appStore={appStore} />
        <Graph appStore={appStore} />
        <Groups appStore={appStore}/>
      </Root>
    );
  }
}

export default observer(App);
