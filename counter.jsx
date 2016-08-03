import React from 'react';

export default React.createClass({
  propTypes: {
    initialCount: React.PropTypes.number.isRequired,
  },
  getInitialState() {
    return { count: this.props.initialCount };
  },
  tick() {
    this.setState({ count: this.state.count + 1 });
  },
  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  },
});
