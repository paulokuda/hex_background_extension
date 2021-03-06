const React = require('react');
const Time = require('./time.jsx');
const Actions = require('./actions.jsx');

const App = React.createClass({
  render() {
    return (
      <div className="app-container">
        <Time />
        <Actions />
      </div>
    );
  }
});

module.exports = App;
