import React from 'react';

const TodoList = React.createClass({
  propTypes: {
    items: React.PropTypes.array.isRequired,
    onItemClick: React.PropTypes.func.isRequired,
  },
  handleClick(i) {
    this.props.onItemClick(i);
  },
  render() {
    const items = this.props.items.map((item, i) =>
      (
      <li key={item.id} onClick={this.handleClick.bind(this, i)}>{item.text}</li>
      )
    );
    return <ul>{items}</ul>;
  },
});

export default React.createClass({
  displayName: 'TodoBox',
  getInitialState() {
    return { items: [], text: '' };
  },
  handleRemove(i) {
    const nextItems = this.state.items.slice();
    nextItems.splice(i, 1);
    this.setState({ items: nextItems });
  },
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleTextSubmit(e) {
    e.preventDefault();
    const nextItems = this.state.items.concat([{ text: this.state.text, id: Date.now() }]);
    const nextText = '';
    this.setState({ items: nextItems, text: nextText });
  },
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} onItemClick={this.handleRemove} />
        <form onSubmit={this.handleTextSubmit}>
          <input onChange={this.handleTextChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
  },
});
