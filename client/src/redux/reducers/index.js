import { combineReducers } from 'redux';
import pollReducer from './pollReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
    poll: pollReducer,
    client: clientReducer
})

export default rootReducer