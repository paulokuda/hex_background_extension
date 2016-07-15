const React = require('react');
const Food = require('./food.jsx');
const Weather = require('./weather.jsx');

const Actions = React.createClass({
  getInitialState: function () {
    return {
      showActionItem: false,
      weatherLoaded: false,
      tabIndex: undefined
    };
  },
  componentWillMount() {
    let tempWatchID = navigator.geolocation.watchPosition(response => {
      if (localStorage.getItem('watchID') !== String(tempWatchID)) {
        localStorage.setItem('watchID', tempWatchID);
        localStorage.setItem('lat', response.coords.latitude);
        localStorage.setItem('lon', response.coords.longitude);
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.getFoodSuggestions(position.coords.latitude, position.coords.longitude);
            localStorage.setItem('watchID', tempWatchID);
            localStorage.setItem('lat', position.coords.latitude);
            localStorage.setItem('lon', position.coords.longitude);
          }, this.showError);
        } else {
          console.log('You do not have geolocation enabled!');
        }
      } else {
        this.getWeatherStatus(localStorage.getItem('lat'), localStorage.getItem('lon'));
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
  getWeatherStatus(lat, lon) {
    if (!localStorage.getItem('currentWeather')) {
      const xhr = new XMLHttpRequest();
      const fullUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3a4a069b47d1da654b6bbf6d730f318`;
      const that = this;
      xhr.onreadystatechange = function() {
    	  if (xhr.readyState == 4 && xhr.status == 200) {
    	    const parsedResponse = JSON.parse(xhr.responseText);
          localStorage.setItem('currentWeatherLocation', parsedResponse.name)
          localStorage.setItem('currentWeather', JSON.stringify(parsedResponse.weather));
    	  }
      };
      xhr.open("GET", fullUrl, true);
      xhr.send();
    }
	},
  getFoodSuggestions(lat, lon) {
    let baseUrl = "https://api.foursquare.com/v2/venues/search?";
  	const data = {
  		ll: lat + "," + lon,
  		client_id: "JYAR0ED2JU1ZKU0OC05VX35DNSRZ2D1S0EQEVFMWPS3ONJKX",
  	  client_secret: "I1OSOHFMD5VTWUKGH540TDCIZ2XHU3Q0JLTZFTAFM1C3CSTW",
  	  categoryId : "4d4b7105d754a06374d81259",
  	  radius : "6400",
  	  v : "20160705"
  	};
    const fullUrl = baseUrl + "ll=" + data.ll + "&client_secret=" + data.client_secret + "&client_id=" + data.client_id + "&categoryId=" + data.categoryId + "&radius=" + data.radius + "&v=" + data.v;
    const xhr = new XMLHttpRequest();
    const that = this;
    xhr.onreadystatechange = function() {
  	  if (xhr.readyState == 4 && xhr.status == 200) {
  	    const parsedResponse = JSON.parse(xhr.responseText);
        localStorage.setItem('venuesArray', JSON.stringify(parsedResponse.response.venues));
        that.displayFood();
  	  }
  	};
  	xhr.open("GET", fullUrl, true);
    xhr.send();
  },
  getRandomIndex(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
  displayFood() {
    if (this.state.tabIndex !== 0) {
        this.setState({
          tabIndex: 0,
          showActionItem: true
        }, () => {
          document.querySelector('.action-item-container').style.visibility = (this.state.showActionItem ? 'visible' : 'hidden');
        });
    } else {
      this.setState({
        showActionItem: !this.state.showActionItem
      }, () => {
        document.querySelector('.action-item-container').style.visibility = (this.state.showActionItem ? 'visible' : 'hidden');
      });
    }
  },
  displayWeather() {
    if (this.state.tabIndex !== 1) {
      this.setState({
        tabIndex: 1,
        showActionItem: true
      }, () => {
        document.querySelector('.action-item-container').style.visibility = (this.state.showActionItem ? 'visible' : 'hidden');
      });
    } else {
      this.setState({
        showActionItem: !this.state.showActionItem
      }, () => {
        document.querySelector('.action-item-container').style.visibility = (this.state.showActionItem ? 'visible' : 'hidden');
      });
    }
  },
  actionItem() {
    if (this.state.tabIndex === 0) {
      const venuesArray = JSON.parse(localStorage.getItem('venuesArray'));
      const randomVenueIndex = this.getRandomIndex(0, venuesArray.length - 1);
      const venue = venuesArray[randomVenueIndex];
      return <Food venue={venue} />;
    } else if (this.state.tabIndex === 1) {
      const weatherObj = localStorage.getItem('currentWeather');
      const location = localStorage.getItem('currentWeatherLocation');
      return <Weather weather={weatherObj} location={location} />;
    }
  },
  render() {
    return (
      <div>
        <div className="actions-container">
          <a onClick={this.displayFood}>HUNGRY</a> |
          <a onClick={this.displayWeather}>WEATHER</a>
        </div>
        <div className="action-item-container">
          {this.actionItem()}
        </div>
      </div>
    );
  }
});

module.exports = Actions;
