import React, { Component } from 'react';
import TodoItem from '../TodoItem';
import './style.css';

class TodoList extends Component {
  render() {
    const todoList = this.props.list.map(item =>
      <TodoItem
        key={ item.id }
        id={ item.id }
        description={ item.description }
        status={ item.status }
        deleteTodo={ this.props.deleteTodo } />
    );

    return (
      <div className="TodoList">
        { todoList }
      </div>
    );
  }
}

export default TodoList;
