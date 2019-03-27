import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Comments from './components/Comments';

const commentData = [{"id":"1", "name":"test name", "comments": "test comment"}, 
                      {"id":"2", "name":"test name 2", "comments": "test comment 2"}]
class App extends Component {
  render() {
    return (
      <div className="App">
        <Comments commentsData={commentData}></Comments>
      </div>
    );
  }
}

export default App;
