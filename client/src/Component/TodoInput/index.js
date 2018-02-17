import React, { Component } from 'react';
import './style.css';

class TodoInput extends Component {
  constructor() {
    super();

    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addTodo(this.state.value);

    this.setState({ value: '' });
  }

  render() {
    return (
      <form className="TodoInput" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Add a ToDo item" value={ this.state.value } onChange={ this.handleChange } />
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </form>
    );
  }
}

export default TodoInput;
