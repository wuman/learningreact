import React from 'react';
import marked from 'marked';
import $ from 'jquery';

const Comment = React.createClass({
  propTypes: {
    author: React.PropTypes.string.isRequired,
  },
  rawMarkup() {
    return { __html: marked(this.props.children.toString(), { sanitized: true }) };
  },
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  },
});

const CommentList = (props) => {
  const commentNodes = props.data.map((comment) =>
    (<Comment author={comment.author} key={comment.id}>
      {comment.text}
    </Comment>)
  );
  return (
    <div className="commentList">{commentNodes}</div>
  );
};
CommentList.propTypes = {
  data: React.PropTypes.array.isRequired,
};

const CommentForm = React.createClass({
  propTypes: {
    onCommentSubmit: React.PropTypes.func.isRequired,
  },
  getInitialState() {
    return { author: '', text: '' };
  },
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  },
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  },
});

// CommentBox
export default React.createClass({
  displayName: 'CommentBox',
  propTypes: {
    pollInterval: React.PropTypes.number.isRequired,
    url: React.PropTypes.string.isRequired,
  },
  getInitialState() {
    return { data: [] };
  },
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      },
    });
  },
  handleCommentSubmit(comment) {
    const comments = this.state.data;
    comment.id = Date.now();
    const newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({ data });
      },
      error: (xhr, status, err) => {
        this.setState({ data: comments });
        console.err(this.props.url, status, err.toString());
      },
    });
  },
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  },
});
