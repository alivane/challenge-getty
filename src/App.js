import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Comments from './components/Comments';

import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <img className="image-bg" src="/images/whatis.jpg"></img>
          <Comments></Comments>
        </div>
      </Provider>
    );
  }
}

export default App;
