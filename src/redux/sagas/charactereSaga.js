import {call, put, takeEvery} from 'redux-saga/effects'; 

const apiUrl = 'https://rickandmortyapi.com/api/character/'; 

function getApi(){
    return fetch(apiUrl, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .catch((error) => {throw error})
}; 

function* fetchCharacteres(action){
    try {
        const characteres = yield call(getApi); 
        yield put({ type: 'GET_CHARACTERES_SUCCESS', characteres: characteres }); 
    } catch(e){
        yield put({type: 'GET_CHARACTERES_FAILED', message: e.message}); 
    }
};

function* characterSaga(){
    yield takeEvery('GET_CHARACTERES_RESQUESTED', fetchCharacteres); 
};

export default characterSaga; 