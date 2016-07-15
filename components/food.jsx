const React = require('react');

const Food = React.createClass({
  render() {
    return (
      <div className="venue-wrap">
        <div className="venue-name center-text">
          <a href={this.props.venue.url} target="_blank" >{this.props.venue.name}</a>
        </div>
        <div className="venue-shortname center-text">
          {this.props.venue.categories[0].shortName}
        </div>
        <div className="venue-address center-text">
          {this.props.venue.location.address}
        </div>
        <div className="venue-distance center-text">
          {(this.props.venue.location.distance * (0.000621371)).toFixed(2)} miles away
        </div>
        <div className="venue-phone center-text">
          {this.props.venue.contact.formattedPhone ? this.props.venue.contact.formattedPhone : "No phone number listed"}
        </div>
        <div className="venue-stats">
          <div className="venue-count">
            People here now:<br/> <center>{this.props.venue.hereNow.count}</center>
          </div>
          <div className="venue-checkins">
            Total Checkins:<br /> <center>{this.props.venue.stats.checkinsCount}</center>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Food;
