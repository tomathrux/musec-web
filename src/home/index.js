
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, Paper, AutoComplete, Subheader } from 'material-ui';
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
    changeCurrentSong : (song) => dispatch(actionCreators.changeCurrentSong(song)),
  }
}

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen : false,
      songs : [],
      autoCompleteSongs : [],
      currentSearch : "",
    };
  }

  componentWillMount() {
    requests.songSearch('Wubstep', 25).then((res) => (
      this.setState({ ...this.state, songs : res })
    ))
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

  updateSearchInput = (terms) => {
    if (terms.length == 0) {
      this.setState({ ...this.state, autoCompleteSongs : [] })
    } else {
      requests.songSearch(terms, 5).then((res) => {
        if (res.length == 0) {
          this.setState({...this.state, autoCompleteSongs: []})
        } else {
          this.setState({
            ...this.state, autoCompleteSongs: res.map((item) => (
              item.snippet.title
            )), currentSearch : terms,
          })
        }
      })
    }
  }

  updateSearch = () => {

    let terms = this.state.currentSearch;

    if (terms.length == 0) {
      this.setState({ ...this.state, songs : [] })
    } else {
      requests.songSearch(terms, 50).then((res) => (
        this.setState({ ...this.state, songs : res })
      ))
    }
  }

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
        <div className="Body">
        <Paper style={{ margin : '14px 14px 0px 14px', display : 'flex', flexDirection : 'row' }}>
          <div style={{ width : 500 }}>
              <AutoComplete
                style={{ marginLeft : 14 }}
                fullWidth
                floatingLabelText="Search"
                onUpdateInput={ this.updateSearchInput }
                filter={ () => (true) }
                onNewRequest={ this.updateSearch }
                dataSource={ this.state.autoCompleteSongs }/>
          </div>
        </Paper>
        <Paper style={{ margin: 14 }}>
          <Subheader>{ this.state.currentSearch.length != 0 ? 'Searched for: ' + this.state.currentSearch : '' }</Subheader>
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
        <Paper>Hey dere</Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
