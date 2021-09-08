import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import exampleSlice from "./reducers/example";

import exampleSaga from "./sagas/example";

/* Reducers */ 
const reducers = combineReducers({
  example: exampleSlice.reducer,
});

/* Sagas */ 
export const rootSagas = function* rootSagas(): any {
  return yield all([exampleSaga()]);
};


/* Store and middlewares configuration */ 
const sagaMiddleware = createSagaMiddleware({});

const middlewares: any = [];
middlewares.push(sagaMiddleware);

const Store = createStore(reducers, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSagas);

export { Store };
