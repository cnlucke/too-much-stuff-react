import React, { Component } from 'react';
import Landing from './components/Landing';
import Game from './components/Game';
import LoginContainer from './components/LoginContainer';
import Leaderboard from './components/Leaderboard';
import { Route, Redirect } from 'react-router'
import './App.css';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends Component {
  state = {
    currentUser: ''
  }

  setUser = (user) => {
    this.setState({currentUser: user})
  }

  createUser = (newUser) => {
    const options = {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({ "user": {"username": newUser.username, "password": newUser.password} })
    }

    fetch('http://localhost:3000/users', options)
      .then(res => res.json())
      .then(user => this.setState({currentUser: user}))
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            this.state.currentUser ? (
              <Redirect to="/game"/>
            ) : (
              <Landing/>
            )
          )}/>
        <Route exact path="/game" render={() => (
              !this.state.currentUser ? (
                <Redirect to="/login"/>
              ) : (
                <Game currentUser={this.state.currentUser}/>
              )
          )}/>
        <Route exact path="/login" render={() => (
            this.state.currentUser ? (
              <Redirect to="/game"/>
            ) : (
              <LoginContainer handleSetUser={this.setUser} handleAddUser={this.createUser}/>
            )
          )}/>
        <Route exact path="/leaderboard" component={Leaderboard} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
