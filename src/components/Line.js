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
left: 10px;
`;

const LineNumber = styled.div`
position: absolute;
top: -8px;
left: -8px;
border-radius: 50%;
background: #fff;
font-size: 12px;
border: 1px solid black;
padding: 2px;
`;

export default class Line extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    worldStart: PropTypes.number.isRequired,
    worldEnd: PropTypes.number.isRequired,
    segments: PropTypes.array.isRequired,
    onAddSegment: PropTypes.func.isRequired,
    onEditSegment: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSegmentFormOpen: false,
    }
  }

  onStartNewSegment = () => {
    this.setState({
      isSegmentFormOpen: true,
      selectedSegment: null,
    });
  };

  onHideForm = () => {
    this.setState({isSegmentFormOpen: false});
  };

  onAddSegment = (params) => {
    if (this.state.selectedSegment) {
      this.props.onEditSegment(params);
    } else {
      this.props.onAddSegment(params);
    }
    this.setState({
      isSegmentFormOpen: false,
      selectedSegment: null,
    });
  };

  onSegmentSelect = segment => {
    this.setState({
      isSegmentFormOpen: true,
      selectedSegment: segment,
    });
  };

  render() {
    const {id, worldStart, worldEnd, segments} = this.props;
    const {isSegmentFormOpen} = this.state;

    return (
      <Root>
        <LineNumber>{id}</LineNumber>
        <AddSegment
          onClick={this.onStartNewSegment}
        >+</AddSegment>
        <LineGraph/>
        {segments.map(segment => (
          <Segment
            segment={segment}
            worldStart={worldStart}
            worldEnd={worldEnd}
            key={segment.title}
            onSelect={this.onSegmentSelect}
          />
        ))}
        {isSegmentFormOpen && (
          <SegmentEditForm
            segment={this.state.selectedSegment}
            onSuccess={this.onAddSegment}
            onCancel={this.onHideForm}
          />
        )}
      </Root>
    )
  }
}
