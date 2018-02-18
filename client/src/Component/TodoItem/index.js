import React, { Component } from 'react';
import './style.css';

class TodoItem extends Component {
  handleDelete = () => {
    this.props.deleteTodo(this.props.id);
  }

  handleUpdate = (event) => {
    const increase = event.currentTarget.className === "IncreaseStatus";
    this.props.updateTodo(this.props.id, increase);
  }

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
          <button
            className="IncreaseStatus"
            alt="Increase Status"
            onClick={ this.handleUpdate }
            disabled={ todoStatus === "Completed" }>
            <i className="fas fa-arrow-up"></i>
          </button>

          <button
            className="DecreaseStatus"
            alt="Decrease Status"
            onClick={ this.handleUpdate }
            disabled={ todoStatus === "NotStarted" }>
            <i className="fas fa-arrow-down"></i>
          </button>

          <button
            alt="Delete Todo"
            onClick={ this.handleDelete }>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
