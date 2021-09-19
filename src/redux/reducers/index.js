import { combineReducers } from 'redux'; 
import characteres from './characteres';

const rootReducer = combineReducers({
    characteres: characteres,
})

export default rootReducer; 