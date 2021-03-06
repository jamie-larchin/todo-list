import React, { Component } from 'react';
import './style.css';

class AppHeader extends Component {
  render() {
    return (
      <div className="AppHeader">
        <div className="Inner">
          <h1>Todo List</h1>

            { this.props.user ?
              (
                <div>
                  <span>Welcome, { this.props.user.displayName } | </span>
                  <button onClick={ this.props.logout }>Logout</button>
                </div>
              ) : (<button onClick={ this.props.login }>Login with Gmail</button>)
            }
        </div>
      </div>
    );
  }
}

export default AppHeader;
