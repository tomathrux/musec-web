/**
 * Created by t on 14/03/17.
 */
import React, { PropTypes }from 'react';
import { IconButton, Slider, Subheader } from 'material-ui';
import { AvVolumeOff, AvVolumeDown, AvVolumeUp, AvPlayArrow, AvPause, AvSkipNext, AvSkipPrevious, AvShuffle, AvLoop, AvQueueMusic } from 'material-ui/svg-icons';

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
    playNext : PropTypes.func.isRequired,
    playPrevious : PropTypes.func.isRequired,
    volume : PropTypes.number.isRequired,
    updateVolume : PropTypes.func.isRequired,
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

  renderVolumeIcon = (volume) => {
    if (volume == 0 ) {
      return <AvVolumeOff/>
    } else if (volume < 50) {
      return <AvVolumeDown />
    } else {
      return <AvVolumeUp/>
    }
  }

  updateVolume = (e, val) => {
    this.props.updateVolume(val)
  }

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
                    iconStyle={{ color : 'White' }}
                    onClick={ this.props.playPrevious }>
                    <AvSkipPrevious/>
                  </IconButton>
                  <IconButton
                    name="pauseplaytrack"
                    style={{ height : 60, width : 60 }}
                    iconStyle={{ color : 'rgb(0, 151, 167)', width : 40, height : 40, position : 'absolute', left: 10, top : 10 }}
                    onClick={ () => this.props.togglePlay(this.props.currentSong) }>
                    { this.props.playing ? <AvPause/> : <AvPlayArrow/> }
                  </IconButton>
                  <IconButton
                    name="nexttrack"
                    style={{ marginTop : 5 }}
                    iconStyle={{ color : 'White' }}
                    onClick={ this.props.playNext }>
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
        <div style={{ flex : 1}}>
          <div style={{ display : 'flex', flexDirection : 'row', paddingTop : 33 }}>
            <div style={{ flex : 1 }}></div>
            <AvQueueMusic style={{ marginRight : 10 }}/>
            { this.renderVolumeIcon(this.props.volume) }
            <Slider
              style={{ marginLeft : 15, marginRight : 15, top : 45, width : 120 }}
              sliderStyle={{ marginBottom : 0, marginTop : 3}}
              value={ this.props.volume }
              max={ 100 }
              onChange={ this.updateVolume }/>
          </div>
        </div>
      </div>
    );
  }

}

export default ControlBar;
