import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import Health from './components/Health';

export default(
  <Router>
    <div className="routes">
      <Route exact path="/" component={AppContainer}/>
      <Route path="/health" component={Health}/>
    </div>
  </Router>
);