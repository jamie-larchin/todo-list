import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebase.js';
import AppHeader from '../AppHeader';
import TodoInput from '../TodoInput';
import TodoList from '../TodoList';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      todos: []
    };
  }

  componentDidMount() {
    this.callApi()
    .then(list => {
      this.setState({ todos: list.todos });
    })
    .catch(err => console.log(err));

    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user });
      }
    });
  }

  callApi = async () => {
    const response = await fetch('/get-todos');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  addTodo = (description, status) => {
    const newTodo = {
      description,
      id: this.state.todos.length,
      status
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

  deleteTodo = (id) => {
    const newList = this.state.todos.filter(item => {
      return item.id !== id;
    });

    this.setState({
      todos: newList
    });

    fetch(`/delete-todo/${ id }`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  updateTodo = (id, increase) => {
    let updatedTodos = this.state.todos;
    const currentStatus = updatedTodos[id].status;

    let newStatus;
    if(currentStatus === "Not Started") {
      if(increase) {
        newStatus = "In Progress";
      }
    } else if (currentStatus === "In Progress") {
      if(increase) {
        newStatus = "Completed";
      } else {
        newStatus = "Not Started";
      }
    } else {
      if(!increase) {
        newStatus = "In Progress";
      }
    }

    updatedTodos[id].status = newStatus;

    this.setState({
      todos: updatedTodos
    });

    fetch(`/update-todo/${ id }`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodos[id]),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  login = () => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  logout = () => {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  render() {
    return (
      <div className="App">
        <AppHeader
          user={ this.state.user }
          login={ this.login.bind(this) }
          logout={ this.logout.bind(this) }></AppHeader>

        <section>
          <TodoInput
            user={ this.state.user }
            addTodo={ this.addTodo.bind(this) }></TodoInput>

          { this.state.user ?
            (
              <TodoList
                list={ this.state.todos }
                deleteTodo={ this.deleteTodo.bind(this) }
                updateTodo= { this.updateTodo.bind(this) }></TodoList>
            ) : (
              <p>Please login to start adding items to your Todo List.</p>
            )
          }
        </section>
      </div>
    );
  }
}

export default App;
