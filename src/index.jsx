import React from 'react'
import { render } from 'react-dom'
import { compose, map, prop, pipe, curry} from 'ramda'

const combine = curry((g, c, m) => x => (<div>{g(x)} {c(x)} {m(x)}</div>));

const mapStateProps = curry((f, g) => compose(g, f));

// const result = todoHeader(state);

const Header = title => (<h1>{title}</h1>);
const getHeader = prop('title')
const TodoHeader = mapStateProps(getHeader, Header);

const Footer = () => (<div> this is our footer </div>);
const TodoFooter = mapStateProps(() => 'undefined', Footer);

const getTodos = prop('todos');
const ItemList = items => (<ul> {items}</ul>);
const Item = item => (<li key={item.id}> {item.content}</li>);

// const TodoList = compose(ListItems, map(Item), getTodos);
const TodoList = mapStateProps(getTodos, compose(ItemList, map(Item)))

const App = combine(TodoHeader, TodoList, TodoFooter);
const props = {todos: [{
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