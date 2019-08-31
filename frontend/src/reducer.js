import { combineReducers } from 'redux';
import usernameReducer from './containers/CheckUsername/saga';

const rootReducer = combineReducers({usernameReducer});
export default rootReducer;