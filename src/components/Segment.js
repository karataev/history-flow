import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Root = styled.div`
position: absolute;
top: 0;
left: ${props => props.start}%;
right: ${props => props.end}%;
height: 2px;
background: tomato;
`;

const Title = styled.div`
position: absolute;
bottom: 0;
`;

const Point = styled.div`
position: absolute;
top: 0;
left: ${props => props.pos}%;
transform: translate(-4px, -4px);
width: 10px;
height: 10px;
background: tomato;
border-radius: 50%;
`;

export default class Segment extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    worldStart: PropTypes.number.isRequired,
    worldEnd: PropTypes.number.isRequired,
  };

  render() {
    const {start, end, worldStart, worldEnd} = this.props;
    const worldLength = worldEnd - worldStart;
    const startPercent = Math.round((start - worldStart) / worldLength * 100);
    const endPercent = 100 - Math.round((end - worldStart) / worldLength * 100);

    return (
      <Root start={startPercent} end={endPercent}>
        <Point pos={0} />
        <Point pos={100} />
        <Title>
          {this.props.title}
        </Title>
      </Root>
    )
  }
}
