// завдання на динамічне розгалуження логіки.
//! Створити редюсер, в який можна динамічно додавати тип екшна і функцію-реагувач на нього
const reducerCaseFns = {};
let state = { todos: [] };
const reducer = (state, action) => {
  const caseFn = reducerCaseFns[action.type];
  if (caseFn) {
    return caseFn(state, action);
  }
  return state;
};
const addTodo = (state, action) => ({
  ...state,
  todos: [
    ...state.todos,
    {
      id: action.payload.id,
      text: action.payload.text,
    },
  ],
});
const removeTodo = (state, action) => ({
  ...state,
  todos: state.todos.filter(todo => todo.id !== action.payload.id),
});
const dispatch = action => {
  state = reducer(state, action);
  console.log('Updated state:', state);
};
const addReducerCase = ({ type, fn }) => {
  reducerCaseFns[type] = fn;
};
addReducerCase({ type: 'todo/addTodo', fn: addTodo });
addReducerCase({ type: 'todo/removeTodo', fn: removeTodo });
export default { reducer, addReducerCase };
dispatch({ type: 'todo/addTodo', payload: { id: 1, text: '30 squats' } });
dispatch({ type: 'todo/addTodo', payload: { id: 2, text: '20 squats' } });
dispatch({ type: 'todo/addTodo', payload: { id: 3, text: '10 squats' } });
console.log('Final state todoAdd:', state);

dispatch({ type: 'todo/removeTodo', payload: { id: 2 } });
dispatch({ type: 'todo/removeTodo', payload: { id: 1 } });
console.log('Final state todoRemove:', state);
