import { useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';
import { minTime } from 'date-fns/constants';
import Heap from 'heap-js';
import SchoolManagement from '../school/pages/homePage';
// const initialState = {
//   todos: [
//     { id: 0, text: 'Learn React', completed: true },
//     { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//     { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
//     { id: 3, text: 'Learn React', completed: true },
//     { id: 4, text: 'Learn Redux', completed: false, color: 'purple' },
//     { id: 5, text: 'Build something fun!', completed: false, color: 'red' },
//   ],
//   filters: {
//     status: 'All',
//     colors: [],
//   },
// };
const initialState = {
  classes: [
    { id: 1, name: '1-A', teacherIds: [], pupilIds: [] },
    { id: 2, name: '2-A', teacherIds: [], pupilIds: [] },
    { id: 3, name: '3-A', teacherIds: [], pupilIds: [] },
  ],
  subjects: [
    { id: 1, name: 'Math' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
  ],
  teachers: [
    { id: 1, name: 'Teacher1', classIds: [0] },
    { id: 2, name: 'Teacher2', classIds: [] },
    { id: 3, name: 'Teacher3', classIds: [] },
  ],
  pupils: [
    { id: 1, name: 'Pupil1', classId: 0 },
    { id: 2, name: 'Pupil2', classId: 0 },
    { id: 3, name: 'Pupil3', classId: 0 },
    { id: 4, name: 'Pupil4', classId: 0 },
    { id: 5, name: 'Pupil5', classId: 0 },
    { id: 6, name: 'Pupil6', classId: 0 },
    { id: 7, name: 'Pupil7', classId: 0 },
    { id: 8, name: 'Pupil8', classId: 0 },
    { id: 9, name: 'Pupil9', classId: 0 },
  ],
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
      {/* <Content /> */}
      <SchoolManagement />
    </Provider>
  );
}

const cycl = {
  0: [0],
  1: [1],
  2: [2, 4, 8, 6],
  3: [3, 9, 7, 1],
  4: [4, 6],
  5: [5],
  6: [6],
  7: [7, 9, 3, 1],
  8: [8, 4, 2, 6],
  9: [9, 1],
};
function lastDigit(as) {
  if (as.length === 0) return 1;
  if (as.every(x => x === 0)) {
    const res = as.length % 2 === 0 ? 1 : 0;
    return res;
  }
  let res = 1;
  // let power = as[as.length - 1] % 4 || 4;
  // let res = power;

  if (res === 0 && as.length > 1) {
    res = as[as.length - 1] % 10;
  }

  let lastIndex = res;
  for (let i = as.length - 2; i >= 0; i--) {
    let osnova = as[i] % 10;
    let p = 10;
    while (osnova === 0) {
      osnova = as[i] % p;
      p *= 10;
    }
    const c = cycl[osnova];

    osnova = osnova < 10 ? osnova : osnova % 10;
    if (osnova === 0 || osnova === 6 || osnova === 5) {
      res = 0;
      lastIndex = res;
      continue;
    }

    if (c.length === 1) {
      res = c[0];
      lastIndex = res;
      continue;
    }
    lastIndex = res;
    res = c[c.length - 1];
    if (res === 0) {
      res = 1;
      lastIndex = res;
      console.log(`${i}  res2=`, c.length - 1);
      continue;
    } else {
      res = c[c.length - 1];
      console.log(`${i}  res3=`, res);

      lastIndex = res;
      console.log(`${i}  lastIndex3=`, lastIndex);
    }
    // Обчислення індексу для вибору цифри
    let index = (lastIndex - 1) % c.length;

    if (index < 0) {
      index += c.length;
    }
    console.log(`${i} index=`, index);
    // console.log(`\x1b[31m(${index} - 1) % ${c.length} = ${index} \x1b[0m`);

    console.log(`as=${as}, i=${i}, osnova=${osnova},    c=${c},  res=index=${index}`);
  }
  console.log(`\x1b[32m as=${as}, res=${res} \x1b[0m`);

  return res;
}

// console.log(lastDigit([4, 3, 6])); //4
// console.log(lastDigit([2, 2, 2, 0])); //!4
// console.log('=====================================');
// console.log(lastDigit([937640, 767456, 981242])); //0
// console.log(lastDigit([0, 0, 0])); // 0
// console.log(lastDigit([7, 6, 21])); //!1
// console.log(lastDigit([])); // 1
// console.log(lastDigit([0, 0])); // 1
// console.log(lastDigit([1, 2])); //1
// console.log(lastDigit([3, 4, 5])); //1
// console.log(lastDigit([12, 30, 21])); //6
// console.log(lastDigit([123232, 694022, 140249])); //6
// console.log(lastDigit([499942, 898102, 846073])); //!6

function dblLinear(n) {
  let minU2U3 = 1;
  let u2 = [3];
  let u3 = [4];
  let u = [...u2, ...u3];
  for (let i = 1; i <= n; i++) {
    let nextU2 = 2 * minU2U3 + 1;
    let nextU3 = 3 * minU2U3 + 1;

    u2.push(nextU2);
    u3.push(nextU3);
    u2 = [...new Set(u2)].sort((a, b) => a - b);
    u3 = [...new Set(u3)].sort((a, b) => a - b);
    let minU2 = u2[0];
    let minU3 = u3[0];
    minU2U3 = Math.min(minU2, minU3);

    if (minU2U3 === minU2) {
      u2.shift();
    }
    if (minU2U3 === minU3) {
      u3.shift();
    }

    u = [...u2, ...u3];
    u = [...new Set(u)].sort((a, b) => a - b);
    if (i === n) {
      console.log(`u[${n}] = ${minU2U3}`);
      return minU2U3;
    }
    console.log();
    // console.log(`Ітерація ${i + 1}: u2 = ${u2}, u3 = ${u3}, u = ${u}, minU2U3 = ${minU2U3}`);
  }
  console.log(`u[n] = ${minU2U3}`);
}

// console.log(dblLinear(10)); //22
// console.log(dblLinear(20)); //57
// console.log(dblLinear(30)); //91
// console.log(dblLinear(50)); //175
// console.log(dblLinear(100)); //447

// const Heap = require('heap-js');

function nLinear(m, n) {
  let u = [1];
  let p = new Set();
  const minHeap = new Heap();
  minHeap.init(1);
  p.add(1);
  while (u.length <= n) {
    for (let j = 0; j < m.length; j++) {
      const nextValue = u[u.length - 1] * m[j] + 1;
      if (!p.has(nextValue)) {
        minHeap.push(nextValue);
        p.add(nextValue);
      }
    }

    const min = minHeap.pop();

    u.push(min);
    p.delete(min);
  }
  return u[n];
}
// console.time('executionTime');
// console.log(nLinear([2, 3], 2000000));
// console.log(nLinear([5, 7, 8], 2000000));
// console.timeEnd('executionTime');

// console.log(nLinear([2, 3], 10)); //22;
// console.log(nLinear([3, 2], 10)); // 22;
// console.log(nLinear([5, 7, 8], 10)); //64;
// console.log(nLinear([5, 7, 8], 11)); // 65;
// console.log(nLinear([2, 3], 20)); //57;
// console.log(nLinear([2, 3], 30)); //91;
// console.log(nLinear([2, 3], 50)); //175;
// console.log(nLinear([2, 3], 100)); // 447;
