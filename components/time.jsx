const React = require('react');

const Time = React.createClass({
  getInitialState() {
    return {
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      hexCode: undefined
    };
  },
  componentWillMount() {
    this.tick();
  },
  tick() {
    const dateObj = new Date();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
	  let seconds = dateObj.getSeconds();
    if (hours/10 < 1) {
      hours = "0" + hours;
    }
    if (minutes/10 < 1) {
      minutes = "0" + minutes;
    }
    if (seconds/10 < 1) {
      seconds = "0" + seconds;
    }
    const hexCode = "#" + hours + minutes + seconds;
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      hexCode: hexCode
    }, function () {
      const body = document.getElementsByTagName("body")[0];
	    body.style.background = this.state.hexCode;
    });
    setInterval(this.tick, 1000);
  },
  render() {
    const hours = this.state.hours;
    const minutes = this.state.minutes;
    const seconds = this.state.seconds;
    const hexCode = this.state.hexCode;
    return (
      <div className="time-container">
        <div className="time-div">
          {hours} : {minutes} : {seconds}
        </div>
        <div className="hex-div">
          {this.state.hexCode}
        </div>
      </div>
    );
  }
});

module.exports = Time;
