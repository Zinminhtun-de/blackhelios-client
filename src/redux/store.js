import { createStore, applyMiddleware } from "redux";
import createReducer from "./reducers";
import Thunk from "redux-thunk";
import io from "socket.io-client";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import {
  socketIOEmitterMiddleware,
  socketIOSubscriberMiddleware,
} from "./middlewares/socket";
import createSagaMiddleware from "redux-saga";
import { responsiveStoreEnhancer } from "redux-responsive";
import { endpoint_ws, prodEndpoint_ws } from "../config";
const URL =
  process.env.NODE_ENV === "development" ? endpoint_ws : prodEndpoint_ws;
const history = createBrowserHistory();
// const socket = io.connect(URL);

export const configureStore = (preloadedState) => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [
    Thunk,
    sagaMiddleware,
    routerMiddleware(history),
    // socketIOSubscriberMiddleware(socket),
    // socketIOEmitterMiddleware(socket),
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer, responsiveStoreEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancers);
  const store = createStore(createReducer(), preloadedState, composedEnhancer);
  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry
  return {
    store: store,
    history: history,
  };
};
