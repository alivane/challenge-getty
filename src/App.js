import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CommentForm from './components/CommentForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CommentForm></CommentForm>
      </div>
    );
  }
}

export default App;
