import { combineReducers } from 'redux';
import energyReducer from './reducers/reducer';
import './store'

const rootReducer = combineReducers({
  energy: energyReducer,
  cdp:cdpReducer
  // Add other reducers here
});

export default rootReducer;
