import React, { Component } from 'react';
import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: [] };
  }

  componentDidMount() {
    this.callApi()
      .then(list => {
        this.setState({ todos: list.todos });
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/get-todos');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  addTodo = (description) => {
    const newTodo = {
      description,
      id: this.state.todos.length,
      status: "Not Started"
    }

    this.setState({
      todos: this.state.todos.concat( [newTodo] )
    });

    fetch('/create-todo', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  render() {
    return (
      <div className="App">
        <TodoInput addTodo={ this.addTodo.bind(this) }></TodoInput>
        <TodoList list={ this.state.todos }></TodoList>
      </div>
    );
  }
}

export default App;
