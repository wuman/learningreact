import React from 'react';
import Reflux from 'reflux';
import TodoStore from '../stores/index';
import TodoActions from '../actions/index';
import Link from './Link';

const FilterLink = React.createClass({
  propTypes: {
    filter: React.PropTypes.string.isRequired,
    children: React.PropTypes.node.isRequired,
  },
  mixins: [Reflux.connect(TodoStore, 'todos')],
  render() {
    return (
      <Link
        active={this.state.todos.filter === this.props.filter}
        onTodoClick={(() => TodoActions.setVisibilityFilter(this.props.filter))}
      >
        {this.props.children}
      </Link>
    );
  },
});

export default FilterLink;
