import React from 'react'
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { compose, map, prop, pipe, curry, reduce, propOr, identity, add, pluck, max, reject} from 'ramda'

const combine = curry((g, c) => x => (<div>{g(x)} {c(x)} </div>));
const combineComonents = (...args) => {
    const [first, ...rest] = args;
    return reduce((acc, c) => combine(acc, c), first, rest);
}

const mapStateProps = curry((f, g) => compose(g, f));

// const result = todoHeader(state);

// Header component
const Header = title => (<h1>{title}</h1>);
const getHeader = prop('title')
const TodoHeader = mapStateProps(getHeader, Header);

// Footer component
const Footer = () => (<div> this is our footer </div>);
const TodoFooter = mapStateProps(() => 'undefined', Footer);

// Todo Item component
const getTodos = prop('todos');
const ItemList = items => (<ul> {items}</ul>);
const Item = item => (<li key={item.id}> {item.content}</li>);
const TodoList = mapStateProps(getTodos, compose(ItemList, map(Item))); // this can be changed to pipes

//Add button
// Header component
const addTodoButton = onSave => (<button onClick={() => onSave('hallo')}>Add a todo item</button>);
const TodoAdd = mapStateProps((props) => (some) => console.log(some), addTodoButton);
// const TodoList = compose(ListItems, map(Item), getTodos);
// TodoList :: getTodos -> ItemLi
const addOne = add(1);
const getAllIds = pluck('id');
const getMax = reduce(max, 0);
const getNextId = compose(addOne, getMax, getAllIds);


const ADD_TODO = 'add_todo';
const DELETE_TODO = 'delete_todo';
const addTodo = content => ({ type: ADD_TODO, content});
const deleteTodo = id => ({type: DELETE_TODO, id});

const createReducer = (init, handlers) => {
    return (state = init, action) => {
        return propOr(identity, prop('type', action), handlers)(state, action);
    }
}
const todo = createReducer([], {
    [ADD_TODO](state, action){
        return [
            {id: getNextId, content: action.contnet, completed: false},
            ...state,

        ]
    },
    [DELETE_TODO](state, action){
        return reject(propEq('id', action.id), state)
    }
});
const year = createReducer('', {});
const title = createReducer('', {});
const reducer = combineReducers(todo, year, title)
const store = createStore(reducer, intitalState);

const bindAction = curry((dispatch, actionCreators) => compose(dispatch, actionCreators));
const bindActionCreators = bindAction(store.dispatch);

const App = combineComonents(TodoHeader, TodoAdd, TodoList, TodoFooter);
const intitalState = {todos: [{
    id: 1,
    content: 'the content of my stuffs'
},
{
    id: 2,
    content: 'Am in a loop or something'
},
{
    id: 3,
    content: 'Am a nard'
}], title: 'A todo List'}

render(<App {...props} />, document.getElementById('app')) // eslint-disable-line