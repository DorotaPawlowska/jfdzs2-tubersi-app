import React, { Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'; 

import SignIn from './routes/signIn/signIn';
import SignUp from "./routes/signUp/signUp";
import Layout from './components/layout/layout.js';
import NotFound from './routes/notFound/notFound.js';

import './App.css';
import Search from './routes/search/search';

class App extends Component {
  componentDidMount() {
    console.log(this.props.status)
  }
  render() {
    return (  
      <BrowserRouter>
          <div className="container-fluid">
            <div className="row">
              {!this.props.status.status ?
                <Switch>
                  <Route exact path="/" component={SignUp}/> 
                  <Route path="/signIn" component={SignIn}/>
                  <Route path='*' exact={true} component={SignUp} />
                </Switch>
                :<Switch>
                  <Route path="*" component={Layout}/>
                  
                </Switch>
              }    
            </div>
          </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = status => {
  return {
      status,
  };
};

export default connect (mapStateToProps)(App);
