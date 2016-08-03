import React from 'react';

export default React.createClass({
  displayName: 'Timer',
  getInitialState() {
    return { secondsElapsed: 0 };
  },
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount() {
    clearInterval(this.interval);
  },
  tick() {
    this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
  },
  render() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  },
});
