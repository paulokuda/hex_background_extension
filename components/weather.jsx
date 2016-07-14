const React = require('react');

const Weather = React.createClass({
  render() {
    console.log('weather');
    console.log(JSON.parse(this.props.weather)[0]);
    return (
      <div>
        Weather in {this.props.location}:<br />
        {JSON.parse(this.props.weather)[0].description}
      </div>
    );
  }
});

module.exports = Weather;
