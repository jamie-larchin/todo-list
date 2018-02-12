import React, { Component } from 'react';
import './style.css';

class TodoInput extends Component {
  constructor() {
    super();
    this.state = {value: 'Add a ToDo item'};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="TodoInput">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }
}

export default TodoInput;
