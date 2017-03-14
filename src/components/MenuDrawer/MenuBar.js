/**
 * Created by t on 13/03/17.
 */

import React, { PropTypes } from 'react';
import { AppBar, Paper, AutoComplete, Subheader } from 'material-ui';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
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
        this.setState({ ...this.state, songs : res, currentResults : terms })
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
          title={
            <div style={{ width : 640 }}>
              <AutoComplete
                fullWidth
                hintText="Search"
                onUpdateInput={ this.updateSearchInput }
                listStyle={{ textOverflow : 'ellipsis' }}
                underlineFocusStyle={{ borderColor : 'rgb(117, 117, 117)' }}
                filter={ () => (true) }
                onNewRequest={ this.updateSearch }
                dataSource={ this.state.autoCompleteSongs }/>
            </div>
          }
          style={{ position : 'fixed', top : 0 }}
          onLeftIconButtonTouchTap={ this.toggleDrawer }
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >
        </AppBar>
        <AppBar
          style={{ position : 'fixed', bottom : 0 }}
          showMenuIconButton={false}
        >
        </AppBar>
        <div className="Body" style={{ padding : 64 }}>
          <Paper style={{ margin : '14px 14px 0px 14px', display : 'flex', flexDirection : 'row' }}>

          </Paper>
          <Paper style={{ margin: 14 }}>
            <Subheader>{ this.state.currentSearch.length != 0 ? 'Showing results for ' + this.state.currentResults : '' }</Subheader>
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
