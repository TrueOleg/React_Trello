import React from 'react';
import { BrowserRouter as Router, Route, browserHistory, IndexRoute, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import SignUpPage from '../components/SignUpPage';
import SignInPage from '../components/SignInPage';
import Home from '../components/Home';
import Invait from '../components/Invait';

import store from './store';


const Root = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
      <Switch>
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/" render={ props => <Home {...props} />}/>
          <Route path="/invait" component={Invait}/>
        </Switch>
      </Router>
    </Provider>  
  );
};

export default Root;

