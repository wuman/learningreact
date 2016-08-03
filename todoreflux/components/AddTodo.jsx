import React from 'react';
import TodoActions from '../actions/index';

const AddTodo = React.createClass({
  render() {
    let input;
    return (
      <div>
        <input ref={node => { input = node; }} />
        <button
          onClick={() => {
            TodoActions.addTodo(input.value);
            input.value = '';
          }}
        >
          Add Todo
        </button>
      </div>
    );
  },
});

export default AddTodo;
