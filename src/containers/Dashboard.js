import React, { Component } from 'react';
import Header from '../components/Header';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoApp from './TodoApp';
import GoodReadApp from './GoodReadApp';

class Dashboard extends Component {
  render() {
    return (
      <Router> 
        <div className="App">
          <Header />
          <Route exact path="/" component={TodoApp} />
          <Route exact path="/good-read" component={GoodReadApp} />
        </div>
      </Router>
    );
  }
}

export default Dashboard;
