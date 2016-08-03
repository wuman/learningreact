import Reflux from 'reflux';

const TodoActions = Reflux.createActions([
  'addTodo',
  'toggleTodo',
  'setVisibilityFilter',
]);

export default TodoActions;
