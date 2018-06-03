import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {observer} from 'mobx-react';

import Footer from "./Footer";
import EntityEditForm from "./EntityEditForm";
import Groups from "./Groups";
import AppStore from '../state/AppStore';
import Years from './Years';
import Graph from './Graph';
import PersonGroupItem from "./EntityGroupItem";
import EntityGroup from "./EntityGroup";

const Root = styled.div`
`;


class App extends Component {

  constructor(props) {
    super(props);

/*
    const allPersonsGroup = {
      id: getNextId(state.groups),
      title: 'Весь список',
      ids: state.segments.map(segment => segment.id),
    };
    state.groups.push(allPersonsGroup);
    this.state = state;
*/
  }

  onPersonToggle = (personId) => {
    const {segments} = this.state;
    const index = _.findIndex(segments, {id: personId});
    let person = _.find(segments, {id: personId});
    person.visible = !person.visible;
    let newSegments = [...segments.slice(0, index), person, ...segments.slice(index + 1)];
    this.setState({segments: newSegments});
  };

  onSelectGroup = groupId => {
    let group = _.find(this.state.groups, {id: groupId});

    const newSegments = this.state.segments.map(segment => {
      const isInGroup = group.names.includes(segment.title);
      if (!isInGroup) return segment;

      return {...segment, visible: true}
    });
    this.setState({segments: newSegments});
  };

  onClearGroup = groupId => {
    let group = _.find(this.state.groups, {id: groupId});

    const newSegments = this.state.segments.map(segment => {
      const isInGroup = group.names.includes(segment.title);
      if (!isInGroup) return segment;

      return {...segment, visible: false}
    });
    this.setState({segments: newSegments});
  };


  render() {
    const {appStore} = this.props;

    return (
      <Root>
        <Footer appStore={appStore} />
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
