import React, { Component } from 'react';
import Header from '../components/Header';
import TodoApp from './TodoApp';

class Dashboard extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TodoApp />
      </div>
    );
  }
}

export default Dashboard;
