import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import 'whatwg-fetch'; //window.fetch polyfill

// Middleware
import logger from '/src/middlewares/logger';
const routingMiddleware = routerMiddleware(browserHistory);
const middlewares = applyMiddleware(logger, thunk, routingMiddleware);

// Components
import { AppContainer } from '/src/components/App.jsx!';
import { LocationContainer } from '/src/components/Location.jsx!';
import { ResultContainer } from '/src/components/Result.jsx!';

// Reducers
import googleMaps from '/src/reducers/google-maps';
import forecast from '/src/reducers/forecast';
const reducers = combineReducers({
  googleMaps,
  forecast,
  routing: routerReducer
});

// Create Store
const store = createStore(reducers, middlewares);
const history = syncHistoryWithStore(browserHistory, store);

// Initialize Google maps api (for location autocomplete)
import { hasLoadedMaps } from '/src/action-creators/google-maps';
const script = document.createElement('script');
const googleMapsBrowserApiKey = 'AIzaSyCGSTpd6g9oDfqBKe_4N-VDe2YeuTtxOp4';
script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${googleMapsBrowserApiKey}&libraries=places&callback=gmapsInit`;
window.gmapsInit = () => store.dispatch(hasLoadedMaps());
document.body.appendChild(script);

// Initialize App 
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to="weather" />
        <Route path="weather">
          <IndexRedirect to="location" />
          <Route path="location" component={LocationContainer}></Route>
          <Route path="result" component={ResultContainer}></Route>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);