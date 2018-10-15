import React, { Component } from 'react';
import {Route,Redirect,BrowserRouter,Switch} from 'react-router-dom';
import './App.css';
import Login from './Login';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login"  exact component={Login}/>
                <Redirect exact strict from="/" to="/login" />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
