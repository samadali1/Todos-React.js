import React from 'react';
import './App.css';
import Todo from './components/todo';
import  store  from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
