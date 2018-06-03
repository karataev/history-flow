import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


export default class PersonGroupItem extends React.Component {

  static propTypes = {
    person: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {person} = this.props;

    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={person.visible}
            onChange={() => this.props.onToggle(person.id)}
          />
          {person.title} ({person.start}-{person.end})
        </label>
      </div>
    )
  }
}