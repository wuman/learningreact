import Reflux from 'reflux';
import TodoActions from '../actions/index';

let todoCounter = 0;

const TodoStore = Reflux.createStore({
  listenables: [TodoActions],
  onAddTodo(text) {
    this.state.todos.push({
      id: todoCounter++,
      text,
      completed: false,
    });
    this.trigger(this.state);
  },
  onToggleTodo(id) {
    this.state.todos = this.state.todos.map(t => {
      if (t.id !== id) {
        return t;
      }
      return Object.assign({}, t, {
        completed: !t.completed,
      });
    });
    this.trigger(this.state);
  },
  onSetVisibilityFilter(filter) {
    this.state.filter = filter;
    this.trigger(this.state);
  },
  getInitialState() {
    this.state = {
      todos: [],
      filter: 'SHOW_ALL',
    };
    return this.state;
  },
});

export default TodoStore;
