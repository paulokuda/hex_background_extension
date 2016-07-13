const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app.jsx');

document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('root');
  ReactDOM.render(<App />, root);
});
