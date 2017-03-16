/**
 * Created by t on 14/03/17.
 */
import React, { PropTypes }from 'react';
import { IconButton, Slider, Subheader } from 'material-ui';
import { AvPlayArrow, AvPause, AvSkipNext, AvSkipPrevious, AvShuffle, AvLoop } from 'material-ui/svg-icons';

class ControlBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static propTypes = {
    currentSong : PropTypes.object.isRequired,
    progress : PropTypes.number.isRequired,
    editProgress : PropTypes.func.isRequired,
    playing : PropTypes.bool.isRequired,
    togglePlay : PropTypes.func.isRequired,
  };

  onDragProgress = () => {
    let val = this.refs.progressslider.state.value;
    this.props.editProgress(val);
  }

  convertDuration = (seconds) => {
    let mins = Math.floor(seconds / 60);
    seconds = ("00" + (seconds % 60)).slice(-2);
    return (mins + ':' + seconds);
  };

  render() {

    return (
      <div
        style={{
          width : '100%',
          height : 90,
          backgroundColor : 'rgb(48, 48, 48)',
          position : 'fixed',
          bottom : 0,
          zIndex : 1101,
          display : 'flex'
        }}>
        <div>
        <img style={{ width : 80, height : 60, margin : 15 }}src={ this.props.currentSong.snippet.thumbnails && this.props.currentSong.snippet.thumbnails.default.url }/>
        </div>
        <div style={{ flex : 1, display : 'flex', flexDirection  : 'column', marginTop : 25 }}>
          <Subheader style={{ color : 'White', lineHeight : '20px', fontSize : 13, paddingLeft : 0 }}>{ this.props.currentSong.snippet.title }</Subheader>
          <Subheader style={{ color : 'rgb(224,224,224)', lineHeight : '20px', fontSize : 12, paddingLeft : 0 }}>{ this.props.currentSong.snippet.channelTitle }</Subheader>
        </div>
        <div style={{ flex : 2 }}>
          <div style={{ height : '100%', display : 'flex', flexDirection : 'column' }}>
            <div style={{ display : 'flex' }}>
              <div style={{ flex : 1 }}/>
                <div style={{ display : 'flex' }}>
                  <IconButton
                    name="shuffletracks"
                    style={{ marginTop : 5 }}
                    iconStyle={{ color : 'White', height : 15, width : 15 }}>
                    <AvShuffle/>
                  </IconButton>
                  <IconButton
                    name="previoustrack"
                    style={{ marginTop : 5 }}
                    iconStyle={{ color : 'White' }}>
                    <AvSkipPrevious/>
                  </IconButton>
                  <IconButton
                    name="pauseplaytrack"
                    style={{ height : 60, width : 60 }}
                    iconStyle={{ color : 'lightslategray', fontSize : 40, position : 'absolute', left: 10, top : 10 }}
                    onClick={ this.props.togglePlay }>
                    <i className="material-icons">{ this.props.playing ? 'pause': 'play_arrow'}</i>
                  </IconButton>
                  <IconButton
                    name="nexttrack"
                    style={{ marginTop : 5 }}
                    iconStyle={{ color : 'White' }}>
                    <AvSkipNext/>
                  </IconButton>
                  <IconButton
                    name="looptracks"
                    style={{ marginTop : 5 }}
                    iconStyle={{ color : 'White', height : 15, width : 15 }}>
                    <AvLoop/>
                  </IconButton>
                </div>
              <div style={{ flex : 1 }}/>
            </div>
            <div style={{ display : 'flex', flexDirection : 'row', flex : 1 }}>
            <div style={{ marginRight : 10, color : 'rgba(255, 255, 255, 0.541176)', fontFamily : 'Roboto, sans-serif' }}>
            { this.convertDuration(Math.round( this.props.progress /100 * this.props.currentSong.duration)) }
              </div>
          <Slider ref='progressslider' style={{  width : '100%' }} sliderStyle={{ marginBottom : 10, marginTop : 0 }} value={this.props.progress} max={100} onDragStop={ this.onDragProgress }/>
            <div style={{ marginLeft : 10, color : 'rgba(255, 255, 255, 0.541176)', fontFamily : 'Roboto, sans-serif' }}>
                { this.convertDuration(this.props.currentSong.duration) }
            </div>
            </div>
          </div>
        </div>
        <div style={{ flex : 1}}/>
      </div>
    );
  }

}

export default ControlBar;
