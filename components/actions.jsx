const React = require('react');
const ActionItem = require('./action_item.jsx');

const Actions = React.createClass({
  getInitialState: function () {
    return {
      tabIndex: undefined,
      lat: undefined,
      lon: undefined
    };
  },
  componentWillMount() {
    let tempWatchID = navigator.geolocation.watchPosition(response => {
      if (localStorage.getItem('watchID') === String(tempWatchID)) {
        this.displayRandomLocation();
      } else {
        localStorage.setItem('watchID', tempWatchID);
        localStorage.setItem('lat', response.coords.latitude);
        localStorage.setItem('lon', response.coords.longitude);
        console.log('ids do not match');
        console.log(String(tempWatchID));
        console.log(localStorage.getItem('watchID').constructor);
        console.log(localStorage);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(response => {
            this.getFoodSuggestions(response.coords.latitude, response.coords.longitude);
            localStorage.setItem('watchID', tempWatchID);
            localStorage.setItem('lat', response.coords.latitude);
            localStorage.setItem('lon', response.coords.longitude);
          }, this.showError);
        } else {
          console.log('You do not have geolocation enabled!');
        }
      }
    });
  },
  showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  },
  getFoodSuggestions(lat, lon) {
    let baseUrl = "https://api.foursquare.com/v2/venues/search?";
  	const data = {
  		ll: lat + "," + lon,
  		client_id: "JYAR0ED2JU1ZKU0OC05VX35DNSRZ2D1S0EQEVFMWPS3ONJKX",
  	  client_secret: "I1OSOHFMD5VTWUKGH540TDCIZ2XHU3Q0JLTZFTAFM1C3CSTW",
  	  categoryId : "4d4b7105d754a06374d81259", // food category
  	  radius : "4800", // in meters (3 mile)
  	  v : "20160705" // version number (YYYY/MM/DD format)
  	};
    const fullUrl = baseUrl + "ll=" + data.ll + "&client_secret=" + data.client_secret + "&client_id=" + data.client_id + "&categoryId=" + data.categoryId + "&radius=" + data.radius + "&v=" + data.v;
    const xhr = new XMLHttpRequest();
    const that = this;
    xhr.onreadystatechange = function() {
  	  if (xhr.readyState == 4 && xhr.status == 200) {
  	    const parsedResponse = JSON.parse(xhr.responseText);
        localStorage.setItem('venuesArray', JSON.stringify(parsedResponse.response.venues));
        that.displayRandomLocation();
  	  }
  	};
  	xhr.open("GET", fullUrl, true);
    xhr.send();
  },
  getRandomIndex(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  displayRandomLocation() {
    const venuesArray = JSON.parse(localStorage.getItem('venuesArray'));
    const randomVenueIndex = this.getRandomIndex(0, venuesArray.length - 1);
    console.log('venues');
    console.log(venuesArray);
    console.log(randomVenueIndex);
    // document.querySelector('.action-item-container').style.visibility = 'visible';
    // console.log('local storage');
    // localStorage.setItem('venuesArray', JSON.stringify(venuesArray));
    // console.log(JSON.parse(localStorage.getItem('venuesArray')));
  },
  render() {
    return (
      <div>
        <div className="actions-container">
          <a onClick={this.getFoodSuggestions.bind(null, this.state.lat, this.state.lon)}>Hungry</a> |
          <a>Weather</a> |
          <a>Events</a>
        </div>
        <ActionItem />
      </div>
    );
  }
});

module.exports = Actions;
