
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Async from 'react-promise';
import { AppBar, Paper } from 'material-ui';
import { MenuDrawer, SongList } from '../components'
import * as actionCreators from '../state/actions';
import { Player } from '../components'
import * as requests from '../requests';

const mapStateToProps = (state) => {
  return {
    playing : state.playing,
    currentSong : state.currentSong,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlay : () => dispatch(actionCreators.togglePlay()),
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

    let prom = requests.songSearch('cloud kid');

    return (
      <div>
        <AppBar
          title=""
          onLeftIconButtonTouchTap={ this.toggleDrawer }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Paper style={{ margin: 14 }}>
          <Async promise={ requests.songSearch('cloud kid') } then={ (result) => <SongList songs={ result } currentSong={ this.props.currentSong } playing={ this.props.playing } /> } />
        </Paper>
        <MenuDrawer
          isOpen={ this.state.isMenuOpen }
          onRequestChange={ this.toggleDrawer }/>
        <Player
          playing={ this.props.playing }
          src={ '/audio?videoId=' + this.props.currentSong.id.videoId }
          runTime={ this.props.currentSong.duration }
          onProgressUpdate={ this.updateProgress }
          onEnd={ this.songEnd }/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
