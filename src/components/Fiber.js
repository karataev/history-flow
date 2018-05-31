import React from 'react';
import PropTypes from 'prop-types';
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


export default class Fiber extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    worldStart: PropTypes.number.isRequired,
    worldEnd: PropTypes.number.isRequired,
  };

  render() {
    const {data, worldStart, worldEnd} = this.props;

    return (
      <Root>
        <LineGraph/>
        <Segment
          segment={data}
          worldStart={worldStart}
          worldEnd={worldEnd}
          key={data.id}
          onSelect={() => console.log('todo: edit segment')}
        />
      </Root>
    )
  }
}
