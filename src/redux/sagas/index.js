import { all } from 'redux-saga/effects'; 
import charactereSaga from './charactereSaga'; 

export default function* rootSaga(){
    yield all([
        charactereSaga(),
    ])
}