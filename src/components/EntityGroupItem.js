import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';


class EntityGroupItem extends React.Component {

  static propTypes = {
    appStore: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
  };

  render() {
    const {entity, appStore} = this.props;


    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={entity.visible}
            onChange={() => appStore.toggleEntity(entity)}
          />
          {entity.id}. {entity.title} ({entity.start}-{entity.end})
        </label>
      </div>
    )
  }
}

export default observer(EntityGroupItem);