/**
 * Created by t on 14/03/17.
 */
import React, { PropTypes }from 'react';
import { IconButton, LinearProgress } from 'material-ui';
import { AvPlayArrow, AvPause, AvSkipNext, AvSkipPrevious } from 'material-ui/svg-icons';


class ControlBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
  };

  render() {

    return (
      <div
        style={{
          width : '100%',
          height : 64,
          backgroundColor : 'rgb(0, 188, 212)',
          position : 'fixed',
          bottom : 0,
          zIndex : 1101
        }}>
        <div>
          <IconButton
            name="skipPrevious">
            <AvSkipPrevious/>
          </IconButton>
        </div>
      </div>
    );
  }

}

export default ControlBar;
