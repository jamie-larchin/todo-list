import React, { Component } from 'react';
import TodoItem from '../TodoItem';
import './style.css';

class TodoList extends Component {
  render() {
    const LIST_DATA = [
      {
        id: 1,
        description: 'My first todo item',
        status: 'Not Started',
      },
      {
        id: 2,
        description: 'My second todo item',
        status: 'In Progress',
      },
      {
        id: 3,
        description: 'My third todo item',
        status: 'Completed',
      },
    ]

    const todoList = LIST_DATA.map(item =>
      <TodoItem key={item.id} description={item.description} status={item.status} />
    )

    return (
      <div className="TodoList">
        { todoList }
      </div>
    );
  }
}

export default TodoList;
