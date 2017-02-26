import React from 'react';
import { AppBar, Drawer } from 'material-ui';

class MenuDrawer extends React.Component {

  constructor(props) {
    super(props);

  }

  static propTypes = {
    isOpen : React.PropTypes.bool,
    onRequestChange : React.PropTypes.func,
  };

  render() {
    return (
      <Drawer
        open={ this.props.isOpen }
        docked={ false }
        onRequestChange={ this.props.onRequestChange }
        children={
          <AppBar
            onLeftIconButtonTouchTap={ this.props.onRequestChange }/>
        }
        />
    );
  }
}

export default MenuDrawer;
