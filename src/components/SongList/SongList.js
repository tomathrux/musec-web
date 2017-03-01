import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';

class SongList extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    songs : React.PropTypes.arrayOf(React.PropTypes.object),
  };

  render() {
    return (
      <div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Song</TableHeaderColumn>
              <TableHeaderColumn>Artist</TableHeaderColumn>
              <TableHeaderColumn>Album</TableHeaderColumn>
              <TableHeaderColumn>Runtime</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.props.songs.map((song) => (
              <TableRow>
                <TableRowColumn>{ song.name }</TableRowColumn>
                <TableRowColumn>{ song.artist }</TableRowColumn>
                <TableRowColumn>{ song.album }</TableRowColumn>
                <TableRowColumn>{ song.runtime }</TableRowColumn>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default SongList;
