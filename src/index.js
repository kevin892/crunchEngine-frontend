import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SavedGifsContainer from './SavedGifsContainer'
import SearchHistoryContainer from './SearchHistoryContainer'

import SignIn from './SignIn'
import Weather from './Weather'
import NewAccount from './NewAccount'

const routing = (
  <Router>
    <div>
      <br/>
      <br/>
      <Route exact path="/" component={App} />
      <Route path="/create-account" component={NewAccount} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/saved-gifs" component={SavedGifsContainer} />
      <Route path="/weather" component={Weather} />
      <Route path="/search-history" component={SearchHistoryContainer} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.unregister();
