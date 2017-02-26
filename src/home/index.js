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
import { AppBar, Paper, Drawer } from 'material-ui';
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

  static propTypes = {
  };

  render() {
    return (
      <div>
      <AppBar
        title="Musec"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <Paper
        style={{ margin : 10 }}>
        <div
          style={{ margin : 10 }}>
          Example Text
        </div>
      </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
