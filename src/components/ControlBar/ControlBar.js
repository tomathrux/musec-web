/**
 * Created by t on 14/03/17.
 */
import React, { PropTypes }from 'react';
import { IconButton, Slider } from 'material-ui';
import { AvPlayArrow, AvPause, AvSkipNext, AvSkipPrevious } from 'material-ui/svg-icons';


class ControlBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    progress : PropTypes.number.isRequired,
    editProgress : PropTypes.func.isRequired,
  };

  onDragProgress = () => {
    let val = this.refs.progressslider.state.value;
    this.props.editProgress(val);
  }

  render() {

    return (
      <div
        style={{
          width : '100%',
          height : 64,
          backgroundColor : 'rgb(48, 48, 48)',
          position : 'fixed',
          bottom : 0,
          zIndex : 1101,
          display : 'flex'
        }}>
        <div style={{ flex : 1}}/>
        <div style={{ flex : 8 }}>
          <div style={{ height : '100%', display : 'flex', flexDirection : 'column' }}>
            <div style={{ display : 'flex' }}>
              <div style={{ flex : 1 }}/>
                <div style={{ display : 'flex' }}>
                  <IconButton
                    name="previoustrack"
                    iconStyle={{ color : 'White' }}>
                    <AvSkipPrevious/>
                  </IconButton>
                  <IconButton
                    name="pauseplaytrack"
                    iconStyle={{ color : 'White' }}>
                    <AvPlayArrow/>
                  </IconButton>
                  <IconButton
                    name="nexttrack"
                    iconStyle={{ color : 'White' }}>
                    <AvSkipNext/>
                  </IconButton>
                </div>
              <div style={{ flex : 1 }}/>
            </div>
          <Slider ref='progressslider' sliderStyle={{ marginTop : 0, marginBottom : 10 }}value={this.props.progress} max={100} onDragStop={ this.onDragProgress }/>
          </div>
        </div>
        <div style={{ flex : 1}}/>
      </div>
    );
  }

}

export default ControlBar;
