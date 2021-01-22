import { combineReducers } from "redux";
import { responsiveStateReducer } from "redux-responsive";
import { connectRouter } from "connected-react-router";
import globalReducer from "../App/reducer";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    router: connectRouter(history),
    browser: responsiveStateReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
