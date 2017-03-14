
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, IconButton } from 'material-ui';
import { AvPlayArrow, AvPause} from 'material-ui/svg-icons'

class SongList extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    songs: React.PropTypes.array.isRequired,
    changeCurrentSong: PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    paying : PropTypes.bool.isRequired,
  };

  togglePlay = (song) => {

    if (this.props.playing && this.props.currentSong.id.videoId != song.id.videoId) {
      this.props.changeCurrentSong(song);
    } else {
      this.props.changeCurrentSong(song);
      this.props.togglePlay();
    }
  };

  convertDuration = (seconds) => {
    let mins = Math.floor(seconds / 60);
    seconds = ("00" + (seconds % 60)).slice(-2);
    return (mins + ':' + seconds);
  };


  render() {
    if (this.props.songs.length == 0) {
      return (
        <div style={{ margin : 14 }}>No results :(</div>
      );
    }
    return (
          <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
              <TableRow>
                <TableHeaderColumn style={{ width : 30 }}></TableHeaderColumn>
                <TableHeaderColumn>Song</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 150 }}>Channel</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 50 }}>Duration</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
              { this.props.songs.map((song) => (
                <TableRow
                  hoverable={ true }
                  style={{ backgroundColor : this.props.currentSong.id.videoId==song.id.videoId ? 'rgb(224,224,224)' : ''}}
                  selectable={ true }
                  key={ song.id.videoId }
                  onDoubleClick={ () => this.togglePlay(song) }>
                  <TableRowColumn style={{ width : 30 }}>{ <IconButton onClick={ () => this.togglePlay(song) }>
                    { this.props.currentSong.id.videoId==song.id.videoId && this.props.playing ? <AvPause/> : <AvPlayArrow /> }
                  </IconButton>}
                  </TableRowColumn>
                  <TableRowColumn>{ song.snippet.title }</TableRowColumn>
                  <TableRowColumn style={{ width : 150 }}>{ song.snippet.channelTitle }</TableRowColumn>
                  <TableRowColumn style={{ width : 50 }}>{ this.convertDuration(song.duration) }</TableRowColumn>
                </TableRow>
              )) }
            </TableBody>
          </Table>
    );
  }
}

export default SongList;
