import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import List from './components/List'
import Input from './components/Input'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="todo fix-middle">
          <Header />
          <Input />
          <List />
        </div>
      </div>
    )
  }
}

export default App