import React, { Component } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import _ from 'lodash';

import Footer from "./Footer";
import Fiber from "./Fiber";
import SegmentEditForm from "./SegmentEditForm";

const Root = styled.div`
`;

const Content = styled.div`
display: flex;
align-items: center;
`;

const Year = styled.div`
padding: 10px;
`;

const LinesContainer = styled.div`
border: 1px solid #666;
flex-grow: 1;
`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = require('../data/data');
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

  render() {
    const {worldStart, worldEnd, segments, editSegment} = this.state;
    const sortedSegments = _.sortBy(segments, 'start');

    return (
      <Root>
        <Content>
          <Year>{worldStart}</Year>
          <LinesContainer>
            {sortedSegments.map(segment => (
              <Fiber
                data={segment}
                worldStart={worldStart}
                worldEnd={worldEnd}
                onEdit={this.onEditFiber}
                key={segment.id}
              />
            ))}
          </LinesContainer>
          <Year>{worldEnd}</Year>
        </Content>
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
      </Root>
    );
  }
}

export default App;
