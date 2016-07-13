const React = require('react');
const Time = require('./time.jsx');

const App = React.createClass({
  render() {
    return (
      <div>
        <Time />
      </div>
    );
  }
});

module.exports = App;
