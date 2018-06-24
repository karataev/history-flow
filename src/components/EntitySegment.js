import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Tooltip} from 'react-tippy';

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
bottom: 2px;
font-size: 12px;
white-space: nowrap;
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

export default class EntitySegment extends React.Component {

  static propTypes = {
    entity: PropTypes.object.isRequired,
    startPercent: PropTypes.number.isRequired,
    endPercent: PropTypes.number.isRequired,
  };

  render() {
    const {entity, startPercent, endPercent} = this.props;

    return (
      <Root
        start={startPercent}
        end={endPercent}
      >
        <Point pos={0} />
        <Point pos={100} />
        <Tooltip
          title={`${entity.start}-${entity.end}`}
          theme="light"
        >
          <Title>{entity.title}</Title>
        </Tooltip>
      </Root>
    )
  }
}
