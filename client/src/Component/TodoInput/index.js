import React, { Component } from 'react';
import './style.css';

class TodoInput extends Component {
  constructor() {
    super();

    this.state = {
      description: '',
      status: 'Not Started'
    };
  }

  handleChange = (event) => {
    const input = event.target.name;

    this.setState({
      [input]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addTodo(this.state.description, this.state.status);

    this.setState({
      description: '',
      status: 'Not Started'
    });
  }

  render() {
    return (
      <form
        className={ "TodoInput" + (this.props.user && this.state.description.length ? " Focus" : "") }
        onSubmit={ this.handleSubmit }>

        <input
          type="text"
          name="description"
          placeholder="Add a ToDo item"
          value={ this.state.description }
          onChange={ this.handleChange } />

        <select
          name="status"
          value={ this.state.status }
          onChange={ this.handleChange }>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" disabled={ !this.props.user || !this.state.description.length }>
          <i className="fas fa-plus"></i>
        </button>

      </form>
    );
  }
}

export default TodoInput;
