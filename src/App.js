import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './containers/home';
import Category from './containers/category';
import Post from './containers/post';
import NewPost from './containers/new-post';
import NotFound from './components-ui/not-found';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div className="body">
            <div className="header">
              <ul className="menu">
                <li className="menu-item">
                  <Link to="/" className="menu-item-link">Home</Link>
                </li>
                <li className="menu-item">
                  <Link to="/novo-post" className="menu-item-link">Novo Post</Link>
                </li>
              </ul>
            </div>
            <h1 className="app-header"> renan's dev blog </h1>
            <h2 className="app-slogan">tecnologia, cerveja e muito diversão</h2>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/novo-post" component={NewPost} />
              <Route path="/editar-post" component={NewPost} />
              <Route path="/:category/:id" component={Post} />
              <Route path="/:category" component={Category} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
