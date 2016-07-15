const React = require('react');

const Weather = React.createClass({
  render() {
    const currentWeather = JSON.parse(this.props.weather)[0];
    return (
      <div>
        <div className="weather-location">
          <center>Current Weather in <u>{this.props.location}</u>:</center><br />
        </div>
        <div className="weather-conditions">
          {currentWeather.description.toUpperCase()}
        </div>

      </div>
    );
  }
});

module.exports = Weather;
