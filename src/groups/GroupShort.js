import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

class GroupShort extends React.Component {

  static propTypes = {
    group: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired,
  };

  onToggle = () => {
    const {appStore, group} = this.props;
    appStore.toggleGroupOpen(group);
    // console.log('store', appStore);
  };

  render() {
    const {group} = this.props;

    return (
      <div>
        {group.title}
        <button onClick={this.onToggle}>
          {group.isOpen ? 'Закрыть' : 'Открыть'}
        </button>
      </div>
    )
  }
}

export default observer(GroupShort);
