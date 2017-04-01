
import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, IconButton, Subheader, IconMenu, MenuItem } from 'material-ui';
import { AvPlayArrow, AvPause, NavigationMoreVert, AvPlaylistPlay} from 'material-ui/svg-icons'

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <NavigationMoreVert />
  </IconButton>
);

class SongList extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    songs: React.PropTypes.array.isRequired,
    changeCurrentSong: PropTypes.func.isRequired,
    listToQueue : PropTypes.func.isRequired,
    addToQueue : PropTypes.func.isRequired,
    insertIntoQueue : PropTypes.func.isRequired,
    togglePlay: PropTypes.func.isRequired,
    playing : PropTypes.bool.isRequired,
  };

  convertDuration = (seconds) => {
    let mins = Math.floor(seconds / 60);
    seconds = ("00" + (seconds % 60)).slice(-2);
    return (mins + ':' + seconds);
  };

  parseContentType = (type) => {
    let typeMap = {
      "youtube#channel" : "Channel",
      "youtube#video" : "Track",
      "youtube#mix" : "Mix",
      "youtube#playlist" : "Playlist",
    }

    if (!typeMap[type]) {
      return ''
    } else {
      return typeMap[type]
    }
  }

  togglePlay(song) {
    this.props.listToQueue();
    this.props.togglePlay(song);
  }

  render() {
    if (this.props.songs.length == 0) {
      return (
        <Subheader>No results found</Subheader>
      );
    }

    return (
          <Table wrapperStyle={{ marginBottom : 90 }}>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
              <TableRow>
                <TableHeaderColumn style={{ width : 30 }}></TableHeaderColumn>
                <TableHeaderColumn>Song</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 100 }}>Channel</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 50 }}>Type</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 50 }}>Duration</TableHeaderColumn>
                <TableHeaderColumn style={{ width : 20 }}></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
              { this.props.songs.map((song) => (
                <TableRow
                  hoverable={ true }
                  style={{ backgroundColor : this.props.currentSong.id.videoId==song.id.videoId ? 'rgba(0, 0, 0, 0.03)' : '', borderBottom : ''}}
                  selectable={ false }
                  key={ song.id.videoId }
                  onDoubleClick={ () => this.togglePlay(song) }>
                  <TableRowColumn style={{ width : 30 }}>{ song.id.kind=="youtube#video"||song.id.kind=="youtube#mix" ? <IconButton onClick={ () => this.togglePlay(song) }>
                    { this.props.currentSong.id.videoId==song.id.videoId && this.props.playing ? <AvPause/> : <AvPlayArrow /> }
                  </IconButton> : <IconButton disabled style={{ width : 30 }}><AvPlaylistPlay/></IconButton>}
                  </TableRowColumn>
                  <TableRowColumn>{ song.snippet.title }</TableRowColumn>
                  <TableRowColumn style={{ width : 100 }}>{ song.snippet.channelTitle }</TableRowColumn>
                  <TableRowColumn style={{ width : 50 }}>{ this.parseContentType(song.id.kind) }</TableRowColumn>
                  <TableRowColumn style={{ width : 50 }}>{ this.convertDuration(song.duration) }</TableRowColumn>
                  <TableRowColumn style={{ width : 20 }}>{  <IconMenu iconButtonElement={iconButtonElement}>
                                                              <MenuItem onClick={ () => this.props.insertIntoQueue(song)}>Play Next</MenuItem>
                                                              <MenuItem onClick={ () => this.props.addToQueue(song) }>Add to Queue</MenuItem>
                                                              <MenuItem>Add to Playlist</MenuItem>
                                                              <MenuItem>Download</MenuItem>
                                                            </IconMenu> }</TableRowColumn>
                </TableRow>
              )) }
            </TableBody>
          </Table>
    );
  }
}

export default SongList;
