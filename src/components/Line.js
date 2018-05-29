import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Segment from "./Segment";
import SegmentEditForm from "./SegmentEditForm";

const Root = styled.div`
position: relative;
margin-top: 20px;
margin-bottom: 20px;
`;

const LineGraph = styled.div`
height: 2px;
background: #ddd;
`;

const AddSegment = styled.button`
position: absolute;
top: -10px;
left: 0;
`;

export default class Line extends React.Component {

  static propTypes = {
    worldStart: PropTypes.number.isRequired,
    worldEnd: PropTypes.number.isRequired,
    segments: PropTypes.array.isRequired,
    onAddSegment: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSegmentFormOpen: false,
    }
  }

  onOpenForm = () => {
    this.setState({isSegmentFormOpen: true});
  };

  onHideForm = () => {
    this.setState({isSegmentFormOpen: false});
  };

  onAddSegment = (params) => {
    this.props.onAddSegment(params);
    this.setState({isSegmentFormOpen: false});
  };

  render() {
    const {worldStart, worldEnd, segments} = this.props;
    const {isSegmentFormOpen} = this.state;

    return (
      <Root>
        <AddSegment
          onClick={this.onOpenForm}
        >+</AddSegment>
        <LineGraph/>
        {segments.map(segment => (
          <Segment
            title={segment.title}
            start={segment.start}
            end={segment.end}
            worldStart={worldStart}
            worldEnd={worldEnd}
            key={segment.title}
          />
        ))}
        {isSegmentFormOpen && (
          <SegmentEditForm
            onAdd={this.onAddSegment}
            onCancel={this.onHideForm}
          />
        )}

      </Root>
    )
  }
}
