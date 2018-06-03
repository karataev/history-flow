import React, { Component } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import _ from 'lodash';

import Footer from "./Footer";
import Fiber from "./Fiber";
import SegmentEditForm from "./SegmentEditForm";
import Groups from "./Groups";

const Root = styled.div`
`;

const YearContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const Year = styled.div`
padding: 10px;
`;

const LinesContainer = styled.div`
border: 1px solid #666;
overflow: hidden;
`;

class App extends Component {

  constructor(props) {
    super(props);

    let state = require('../data/data');
    state.segments = _.sortBy(state.segments, 'start');
    let allNames = state.segments.map(segment => segment.title);

    state.groups = [
      {
        id: 1,
        title: 'Правители Российского государства',
        names: ['Рюрик', 'Юрий Долгорукий'],
      },
      {
        id: 2,
        title: 'Весь список',
        names: allNames,
      }
    ];
    this.state = state;
  }

  onAddFiber = () => {
    const ids = this.state.segments.map(segment => segment.id);
    const nextId = Math.max(...ids) + 1;
    let editSegment = {
      id: nextId,
      title: 'foo',
      start: 0,
      end: 0,
    };
    this.setState({editSegment});
  };

  onEditFiber = segment => {
    this.setState({editSegment: segment});
  };

  onSave = () => {
    const json = JSON.stringify(this.state, null, 2);
    console.log(json);
    copy(json);
  };

  onEditSuccess = (editedSegment) => {
    const {segments} = this.state;
    const index = _.findIndex(segments, {id: editedSegment.id});
    let newSegments;
    if (index === -1) {
      newSegments = [...segments, editedSegment];
    } else {
      newSegments = [...segments.slice(0, index), editedSegment, ...segments.slice(index + 1)];
    }

    this.setState({
      segments: newSegments,
      editSegment: null,
    });
  };

  onEditCancel = () => {
    this.setState({editSegment: null});
  };

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
    const {worldStart, worldEnd, segments, editSegment, groups} = this.state;
    const visiblePersons = segments.filter(segment => segment.visible);

    return (
      <Root>
        <LinesContainer>
          {visiblePersons.map(segment => (
            <Fiber
              data={segment}
              worldStart={worldStart}
              worldEnd={worldEnd}
              onEdit={this.onEditFiber}
              key={segment.id}
            />
          ))}
        </LinesContainer>
        <YearContainer>
          <Year>{worldStart}</Year>
          <Year>{worldEnd}</Year>
        </YearContainer>
        {editSegment && (
          <SegmentEditForm
            segment={editSegment}
            onSuccess={this.onEditSuccess}
            onCancel={this.onEditCancel}
          />
        )}
        <Footer
          onAddFiber={this.onAddFiber}
          onSave={this.onSave}
        />
        <Groups
          groups={groups}
          allPersons={segments}
          onPersonToggle={this.onPersonToggle}
          onSelectGroup={this.onSelectGroup}
          onClearGroup={this.onClearGroup}
        />
      </Root>
    );
  }
}

export default App;
