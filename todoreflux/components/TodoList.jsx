import React from 'react';
import Todo from './Todo';
import Reflux from 'reflux';
import TodoStore from '../stores/index';
import TodoActions from '../actions/index';

const TodoList = React.createClass({
  mixins: [Reflux.connect(TodoStore, 'todos')],
  render() {
    const filter = this.state.todos.filter;
    return (
      <ul>
        {
          this.state.todos.todos
            .filter(todo => {
              switch (filter) {
                case 'SHOW_ALL':
                  return true;
                case 'SHOW_COMPLETED':
                  return todo.completed;
                case 'SHOW_ACTIVE':
                  return !todo.completed;
                default:
                  return true;
              }
            })
            .map(todo => (
              <Todo
                key={todo.id}
                text={todo.text}
                completed={todo.completed}
                onClick={() => TodoActions.toggleTodo(todo.id)}
              />
            ))
        }
      </ul>
    );
  },
});

export default TodoList;
