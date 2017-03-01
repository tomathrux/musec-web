/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, Paper } from 'material-ui';
import { MenuDrawer, SongList } from '../components'
import * as actionCreators from '../state/actions';

const mapStateToProps = (state) => {
  return {
    count: state.count,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incCount : () => dispatch(actionCreators.incrementCount()),
  }
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen : false,
    };
  }

  static propTypes = {
  };

  toggleDrawer = () => {
    this.setState({ ...this.state, isMenuOpen : !this.state.isMenuOpen })
  }

  render() {
    return (
      <div>
        <AppBar
          title=""
          onLeftIconButtonTouchTap={ this.toggleDrawer }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Paper>
          <SongList />
        </Paper>
        <MenuDrawer
          isOpen={ this.state.isMenuOpen }
          onRequestChange={ this.toggleDrawer }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
