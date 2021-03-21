import React, {Component} from 'react';
import RooterComponent from './src/router/Router';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import reducers from './src/redux/reducers';
import ReduxThunk from 'redux-thunk';
import {socket} from './src/functions/WebSocketMain';
export default class App extends Component {
  componentDidMount() {
    socket.onopen = () => {
      socket.send(
        '{"event":"subscribe", "subscription":{"depth":10,"name":"book"}, "pair":["XBT/USD"]}',
      );
    };
  }
  componentWillUnmount() {
    socket.close();
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RooterComponent></RooterComponent>
      </Provider>
    );
  }
}
