import statusReducer from './status';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    status: statusReducer
});

export default allReducers;