
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, IconButton } from 'material-ui';
import { AvPlayArrow, AvPause} from 'material-ui/svg-icons'

class SongList extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    songs: React.PropTypes.array.isRequired,
  };

  togglePlay = (song) => {
    let playing = true;
    if (this.state.currentSong.id.videoId == song.id.videoId) {
      playing = !this.state.playing
    }
    this.setState(Object.assign({}, this.state, { currentSong : song, playing : playing, loading : true }));
  }

  updateProgress = (time) => {
    if (Math.floor(time) != this.state.currentTime) {
      this.setState({ 'currentTime' : Math.floor(time) });
    }
  }

  songEnd = () => {
    this.setState({ 'playing' : false });
  }

  render() {
  console.log(this.props.songs)
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
                  style={{ backgroundColor : this.props.currentSong.id.videoId==song.id.videoId ? 'rgb(224, 224, 224)' : ''}}
                  selectable={ true }
                  key={ song.id.videoId }
                  onDoubleClick={ () => this.togglePlay(song) }>
                  <TableRowColumn style={{ width : 30 }}>{ <IconButton onClick={ () => this.togglePlay(song) }>
                    { this.props.currentSong.id.videoId==song.id.videoId && this.props.playing ? <AvPause/> : <AvPlayArrow /> }
                  </IconButton>}
                  </TableRowColumn>
                  <TableRowColumn>{ song.snippet.title }</TableRowColumn>
                  <TableRowColumn style={{ width : 150 }}>{ song.snippet.channelTitle }</TableRowColumn>
                  <TableRowColumn style={{ width : 50 }}>{ song.duration }</TableRowColumn>
                </TableRow>
              )) }
            </TableBody>
          </Table>
    );
  }
}

export default SongList;
