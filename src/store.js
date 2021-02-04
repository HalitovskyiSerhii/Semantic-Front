import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import analyzeReducer from './containers/Analyze/reducer';
import topReducer from './containers/Texts/reducer';

export const history = createBrowserHistory();

const initialState = {};

const middlewares = [
  thunk,
  routerMiddleware(history)
];

const composedEnhancers = compose(
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

const reducers = {
  analyze: analyzeReducer,
  top: topReducer
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
});

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export default store;
