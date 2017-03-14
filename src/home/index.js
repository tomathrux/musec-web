
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, Paper, AutoComplete, Subheader, IconButton, LinearProgress } from 'material-ui';
import { AvPlayArrow, AvPause, AvSkipNext, AvSkipPrevious, ActionSearch, NavigationClose } from 'material-ui/svg-icons'
import { MenuDrawer, SongList } from '../components'
import * as actionCreators from '../state/actions';
import { Player, SearchBar } from '../components'
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
    changeCurrentSong : (song) => dispatch(actionCreators.changeCurrentSong(song)),
  }
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen : false,
      isSearchOpen : false,
      songs : [],
      autoCompleteSongs : [],
      currentSearch : "",
      currentResults : "",
      currentTime : 0,
    };
  }

  // TODO convert to redux state
  updateProgress = (time) => {
    if (Math.floor(time) != this.state.currentTime) {
      this.setState({ 'currentTime' : Math.floor(time) });
      if (Math.floor(time) == this.props.currentSong.duration) {
        this.props.togglePlay();
      }
    }
  }

  updateSearch = (terms) => {
    if (terms.length == 0) {
      this.setState({ ...this.state, songs : [] })
    } else {
      requests.songSearch(terms, 20).then((res) => (
        this.setState({ ...this.state, songs : res, currentResults : terms })
      ))
    }
  }

  toggleDrawer = () => {
    this.setState({ ...this.state, isMenuOpen : !this.state.isMenuOpen })
  }

  render() {

    let { isMenuOpen } = this.state;

    return (
      <div>
        <AppBar
          title={
            <div style={{ display : 'flex' }}>
              <div style={{ flex : 3 }}></div>
              <SearchBar search={ this.updateSearch }/>
            </div>
          }
          style={{ position : 'fixed', top : 0 }}
          onLeftIconButtonTouchTap={ this.toggleDrawer }
        >
        </AppBar>
        <div className="Body" style={{ padding : 64 }}>
        <Paper style={{ margin: 14 }}>
          <LinearProgress mode={ 'determinate' } value={ this.state.currentTime / this.props.currentSong.duration *100} max={ 100 }/>
          <Subheader>{ this.state.currentSearch.length > 0 ? 'Showing results for ' + this.state.currentResults : '' }</Subheader>
          <SongList
            songs={ this.state.songs }
            currentSong={ this.props.currentSong }
            changeCurrentSong={ this.props.changeCurrentSong }
            playing={ this.props.playing }
            togglePlay={ this.props.togglePlay }/>
        </Paper>
        </div>
        <MenuDrawer
          isOpen={ this.state.isMenuOpen }
          onRequestChange={ this.toggleDrawer }/>
        <Player
          playing={ this.props.playing }
          src={ 'http://localhost:3002/audio?videoId=' + this.props.currentSong.id.videoId }
          runTime={ this.props.currentSong.duration }
          onProgressUpdate={ this.updateProgress }
          onEnd={ this.props.togglePlay }/>
      </div>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
