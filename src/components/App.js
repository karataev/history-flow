import React, { Component } from 'react';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import _ from 'lodash';

import Footer from "./Footer";
import Fiber from "./Fiber";

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

  onAddLine = () => {
    const ids = this.state.segments.map(line => line.id);
    const nextId = Math.max(...ids) + 1;
    const newLine = {id: nextId};
    this.setState({
      lines: [...this.state.lines, newLine],
    });
  };

  onAddSegment = (lineId, {title, start, end}) => {
    const ids = this.state.segments.map(line => line.id);
    const nextId = Math.max(...ids) + 1;
    const newSegment = {
      id: nextId,
      line: lineId,
      title,
      start,
      end,
    };
    this.setState({
      segments: [...this.state.segments, newSegment]
    })
  };

  onEditSegment = (segmentCopy) => {
    let index = _.findIndex(this.state.segments, {id: segmentCopy.id});
    let copy = this.state.segments.slice();
    copy[index] = segmentCopy;
    this.setState({
      segments: copy,
    });
  };

  onSave = () => {
    const json = JSON.stringify(this.state, null, 2);
    console.log(json);
    copy(json);
  };

  render() {
    const {worldStart, worldEnd, segments} = this.state;
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
                key={segment.id}
              />
            ))}
          </LinesContainer>
          <Year>{worldEnd}</Year>
        </Content>
        <Footer
          onAddLine={this.onAddLine}
          onSave={this.onSave}
        />
      </Root>
    );
  }
}

export default App;
