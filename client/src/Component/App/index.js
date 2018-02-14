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

  render() {
    return (
      <div className="App">
        <TodoInput></TodoInput>
        <TodoList list={ this.state.todos }></TodoList>
      </div>
    );
  }
}

export default App;
