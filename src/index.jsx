import React from 'react'
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { compose, map, prop, pipe, curry, reduce, propOr, identity, add, pluck, max, reject,propEq} from 'ramda'

const combine = curry((g, c) => x => (<div>{g(x)} {c(x)} </div>));
const combineComonents = (...args) => {
    const [first, ...rest] = args;
    return reduce((acc, c) => combine(acc, c), first, rest);
}

const mapStateProps = curry((f, g) => compose(g, f)); // This is the same as Pipe

// const result = todoHeader(state);

// Header component
const Header = title => (<h1>{title}</h1>);
const getHeader = prop('title')
const TodoHeader = mapStateProps(getHeader, Header);

// Footer component
const Footer = (year) => (<div> this is our footer {year}</div>);
const TodoFooter = mapStateProps((props) => props.year, Footer);

//TodoList Component
// const getTodos = prop('todos');
// const ItemList = items => (<ul> {items}</ul>);
// const Item = item => (<li key={item.id}> {item.content}</li>);
// const TodoList = mapStateProps(getTodos, compose(ItemList, map(Item))); // this can be changed to pipes

//Todo List refactored
const getTodosAndProps = (props) => ({todos: props.todos, onDelete: props.dispatch(deleteTodo)});
const mapPropsToitem = ({todos, onDelete}) => {
    return map((todo) => Item(todo, onDelete), todos);
}
const ItemList = items => (<ul> {items} </ul>);
const Item = (item, onDelete) => (<li key={item.id}> {item.content}<button onClick={() => onDelete(item.id)}> Delete this todo </button></li>)
const TodoList = mapStateProps(getTodosAndProps, compose(ItemList, mapPropsToitem));

//Add button
// Header component
const addTodoButton = ({onSave}) => (<button onClick={() => onSave('hallo')}>Add a todo item</button>);
const TodoAdd = mapStateProps((props) => ({onSave: props.dispatch(addTodo)}), addTodoButton);
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
}], title: 'A todo List', year: 1997};
const createReducer = (init, handlers) => {
    return (state = init, action) => {
        return propOr(identity, prop('type', action), handlers)(state, action);
    }
}
const todos = createReducer([], {
    [ADD_TODO](state, action){
        return [
            {id: getNextId(state), content: action.content, completed: false},
            ...state,

        ]
    },
    [DELETE_TODO](state, action){
        return reject(propEq('id', action.id), state)
    }
});
const year = createReducer('', {});
const title = createReducer('', {});
const reducer = combineReducers({todos, year, title});
const store = createStore(reducer, intitalState);

const bindAction = curry((dispatch, actionCreators) => compose(dispatch, actionCreators));
const bindActionCreators = bindAction(store.dispatch);

const App = combineComonents(TodoHeader, TodoAdd, TodoList, TodoFooter);

const getRender = node => app => render(app, node)
const renderDom = getRender(document.getElementById('app'));
const run = store.subscribe(() => {
    return renderDom(<App {...store.getState()} dispatch={bindActionCreators}/>);
})
const init = store.dispatch({type: "@@init"});