import React, { Component } from 'react';
import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoInput></TodoInput>
        <TodoList></TodoList>
      </div>
    );
  }
}

export default App;
