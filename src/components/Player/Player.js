/**
 * Created by t on 12/03/17.
 */

import React, { PropTypes } from 'react';

class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    playing : PropTypes.bool.isRequired,
    src : PropTypes.string.isRequired,
    runTime : PropTypes.number.isRequired,

    onEnd : React.PropTypes.func,
    onProgressUpdate : React.PropTypes.func,
  };

  componentDidMount() {

    let playerElement = this.refs.player;
    let { onEnd } = this.props;

    playerElement.addEventListener('timeupdate', this.timeUpdate);
    if (!!onEnd) playerElement.addEventListener('ended', onEnd);
  }

  timeUpdate = () => {

    let { onProgressUpdate } = this.props;

    if (!!onProgressUpdate) onProgressUpdate(this.refs.player.currentTime);
  }

  componentWillUnmount() {

    let playerElement = this.refs.player;
    let { onProgressUpdate, onEnd } = this.props;

    if (!!onProgressUpdate) playerElement.removeEventListener('timeupdate', onProgressUpdate);
    if (!!onEnd) playerElement.removeEventListener('ended', onEnd);
  }


  componentDidUpdate = () => {
    this.props.playing ? this.refs.player.play() : this.refs.player.pause();;
  }

  render() {

    let { src } = this.props;

    if (src == '') {
      return;
    } else {
      return (
        <audio
          ref="player"
          src={ src } />
      );
    }
  }
}

export default Player;
