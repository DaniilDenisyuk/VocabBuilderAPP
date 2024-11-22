import { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import Classes from '../school/Classes';

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
    { id: 3, text: 'Learn React', completed: true },
    { id: 4, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 5, text: 'Build something fun!', completed: false, color: 'red' },
  ],
  filters: {
    status: 'All',
    colors: [],
  },
};

// Use the initialState as a default value
function appReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'addTodo/rejected':
      return {
        ...state,
        error: action.payload,
      };
    case 'addTodo/fulfilled':
      return {
        ...state,
        todos: state.todos,
      };

    case 'editTodo':
      return {};
    case 'setIsLoading': {
      return { ...state, isLoading: action.payload };
    }
    default:
      // If this reducer doesn't recognize the action type, or doesn't
      // care about this specific action, return the existing state unchanged
      return state;
  }
}

const store = createStore(appReducer);

function Content() {
  //отримати todos з Redux store за допомогою useSelector і вивести їх
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [newTodoColor, setNewTodoColor] = useState('blue');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteTodo = id => {
    dispatch({ type: 'deleteTodo', payload: id });
  };
  const handleAddTodo = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const randNum = Math.random();
      if (randNum > 0.5) {
        dispatch({ type: 'addTodo', payload: { text: newTodo.trim(), color: newTodoColor } });
        setNewTodo('');
      } else {
        setError('some unexpected error');
      }
    }, 2000);
  };
  return (
    <>
      <div>
        <h1>Todo list</h1>
        <ul>
          {todos.map(todo => (
            <li key={todo.id} style={{ color: todo.color }}>
              {todo.text} {todo.completed ? 'Completed' : 'Not completed'} {todo.color}
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete todo
              </button>
            </li>
          ))}
        </ul>
        <button type="button">?</button>
      </div>
      <input
        type="text"
        value={newTodo}
        onChange={e => {
          setNewTodo(e.target.value);
        }}
        placeholder="new todo"
      />
      <select value={newTodoColor} onChange={e => setNewTodoColor(e.target.value)}>
        <option value="green">Green</option>
        <option value="yellow">Blue</option>
        <option value="red">Red</option>
      </select>
      <button type="button" onClick={handleAddTodo}>
        Add todo
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}

export default function TestPage() {
  return (
    <Provider store={store}>
      <Content />
      <Classes />
    </Provider>
  );
}
