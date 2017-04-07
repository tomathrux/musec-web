
import React, { PropTypes } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { AppBar, Paper, AutoComplete, Subheader, IconButton, LinearProgress } from 'material-ui';
import { NavigationMenu } from 'material-ui/svg-icons'
import { MenuDrawer, SongList } from '../components'
import * as actionCreators from '../state/actions';
import { Player, SearchBar, ControlBar } from '../components'
import * as requests from '../requests';
import * as constants from '../constants';
require('./styles.css');

const mapStateToProps = (state) => {
  return {
    playing : state.playing,
    queuePosition : state.queuePosition,
    queue : state.queue,
    currentTime : state.currentTime,
    volume : state.volume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    togglePlay : (song) => dispatch(actionCreators.togglePlay(song)),
    changeCurrentSong : (song) => dispatch(actionCreators.changeCurrentSong(song)),
    setQueue : (queue) => dispatch(actionCreators.setQueue(queue)),
    addToQueue : (song) => dispatch(actionCreators.addToQueue(song)),
    insertIntoQueue : (song) => dispatch(actionCreators.insertIntoQueue(song)),
    removeFromQueue : (song) => dispatch(actionCreators.removeFromQueue(song)),
    playNext : () => dispatch(actionCreators.playNext()),
    playPrevious : () => dispatch(actionCreators.playPrevious()),
    updateCurrentTime : (seconds) => dispatch(actionCreators.updateCurrentTime(seconds)),
    updateVolume : (perc) => dispatch(actionCreators.updateVolume(perc)),
  }
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen : true,
      songs : [],
      currentTime : 0,
      currentSearch : '',
    };
  }

  componentWillUpdate(nextProps) {
    // Resets the song if prev button pressed with less than 3s progress
    if (nextProps.currentTime == 0) {
      this.editProgress(nextProps.currentTime);
    }
  }

  updateProgress = (time) => {
    if (Math.round(time) != this.props.currentTime) {
      this.props.updateCurrentTime(Math.round(time));
    }
  }

  songEnd = () => {
    if (this.props.queuePosition < this.props.queue.length) {
      this.props.playNext();
    } else {
      this.props.togglePlay(this.props.queue[this.props.queuePosition]);
    }
  }

  editProgress = (progress) => {
    this.refs.player.refs.player.currentTime = Math.round(progress/100 * this.props.queue[this.props.queuePosition].duration)
  }

  updateSearch = (terms) => {
    if (terms.length == 0) {
      this.setState({ ...this.state, songs : [] })
    } else {
      requests.songSearch(terms, 20).then((res) => {
        this.setState({ ...this.state, songs : res, currentResults : terms });
      })
    }
  }

  listToQueue = () => {
    // Cut out anything that isn't a video
    let q = this.state.songs.slice();
    for (let i in q) {
      if (q[i].id.kind != "youtube#video" && q[i].id.kind != "youtube#mix") {
        q.splice(i, 1);
      }
    }
    this.props.setQueue(q);
  }

  toggleDrawer = () => {
    this.setState({ ...this.state, isMenuOpen : !this.state.isMenuOpen })
  }

  render() {
    let { isMenuOpen } = this.state;
    let currentSong = this.props.queue[this.props.queuePosition];

    return (
      <div>
        <AppBar
          title={
            <div style={{ display : 'flex' }}>
              <div style={{ flex : 3 }}></div>
              <SearchBar search={ this.updateSearch }/>
            </div>
          }
          style={{ position : 'fixed', top : 0, backgroundColor : 'rgb(48, 48, 48)' }}
          onLeftIconButtonTouchTap={ this.toggleDrawer }
        > 
        </AppBar>
        <ControlBar
          currentSong={ currentSong }
          progress={ this.props.currentTime!=0 ? this.props.currentTime / this.props.queue[this.props.queuePosition].duration *100 : 0}
          editProgress={ this.editProgress }
          playing={ this.props.playing }
          togglePlay={ this.props.togglePlay }
          playPrevious={ this.props.playPrevious }
          playNext={ this.props.playNext }
          volume={ this.props.volume }
          updateVolume={ this.props.updateVolume }/>
        <div className="Body" style={{ display : 'flex' }}>
          <div style={{ flex : this.state.isMenuOpen ? 1 : 0, marginTop : 78, overflowX : 'hidden', height : '100%' }}>
            <MenuDrawer />
          </div>
        <Paper style={{ margin: '78px 28px 14px 28px', flex: 5 }}>
          <Route path={'/home'} component={<div />} />  
          <Route path={'/search'} component={
            <SongList
              songs={ this.state.songs }
              currentSong={ currentSong }
              changeCurrentSong={ this.props.changeCurrentSong }
              listToQueue={ this.listToQueue }
              addToQueue={ this.props.addToQueue }
              insertIntoQueue={ this.props.insertIntoQueue }
              playing={ this.props.playing }
              togglePlay={ this.props.togglePlay }/>
            } />
            
        </Paper>
        </div>
        <Player
          ref="player"
          playing={ this.props.playing }
          src={ constants.api_url + 'audio?videoId=' + this.props.queue[this.props.queuePosition].id.videoId }
          runTime={ this.props.queue[this.props.queuePosition].duration }
          volume={ this.props.volume }
          onProgressUpdate={ this.updateProgress }
          onEnd={ this.songEnd }/>
      </div>

    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
