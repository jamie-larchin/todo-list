import React, { Component } from 'react';
import './style.css';

class TodoItem extends Component {
  render() {
    const todoStatus = this.props.status.replace(/\s+/g, '');
    const todoStatusIcon = (todoStatus === 'NotStarted' ? 'minus' : (todoStatus === 'InProgress' ? 'circle' : 'check'));

    return (
      <div className={ `TodoItem ${ todoStatus }` }>
        <div className="Status">
          <i className={ `fas fa-${ todoStatusIcon }` }></i>
        </div>

        <div className="Description">{ this.props.description }</div>

        <div className="Manage">
          <button alt="Increase Status"><i className="fas fa-arrow-up"></i></button>
          <button alt="Decrease Status"><i className="fas fa-arrow-down"></i></button>
          <button alt="Delete ToDo"><i className="fas fa-times"></i></button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
