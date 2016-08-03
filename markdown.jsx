import React from 'react';
import marked from 'marked';

export default React.createClass({
  displayName: 'MarkdownBox',
  getInitialState() {
    return { value: 'Type some *markdown* here!' };
  },
  handleChange(e) {
    this.setState({ value: e.target.value });
  },
  rawMarkup() {
    return { __html: marked(this.state.value, { sanitize: true }) };
  },
  render() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea onChange={this.handleChange} defaultValue={this.state.value} />
        <h3>Output</h3>
        <div className="content" dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  },
});
