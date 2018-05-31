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
    onEdit: PropTypes.func.isRequired,
  };

  render() {
    const {data, worldStart, worldEnd} = this.props;

    const worldLength = worldEnd - worldStart;
    const startPercent = Math.round((data.start - worldStart) / worldLength * 100);
    const endPercent = 100 - Math.round((data.end - worldStart) / worldLength * 100);

    return (
      <Root onClick={() => this.props.onEdit(data)}>
        <LineGraph/>
        <Segment
          startPercent={startPercent}
          endPercent={endPercent}
          title={data.title}
          key={data.id}
        />
      </Root>
    )
  }
}
