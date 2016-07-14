const React = require('react');

const Food = React.createClass({
  render() {
    return (
      <div className="venue-wrap">
        <div className="venue-name">
          {this.props.venue.name}
        </div>
        <div className="venue-phone">
          {this.props.venue.contact.formattedPhone}
        </div>
        <div className="venue-count">
          {this.props.venue.hereNow.count}
        </div>
        <div className="venue-checkins">
          {this.props.venue.stats.checkinsCount}
        </div>
        <div className="venue-url">
          {this.props.venue.url}
        </div>
        <div className="venue-shortname">
          {this.props.venue.categories[0].shortName}
        </div>
        <div className="venue-address">
          {this.props.venue.location.address}
        </div>
        <div className="venue-distance">
          {this.props.venue.location.distance}
        </div>
      </div>
    );
  }
});

module.exports = Food;
