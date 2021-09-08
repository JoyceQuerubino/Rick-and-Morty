import { all, takeLatest, put, delay } from "redux-saga/effects";

import exampleSlice from "../reducers/example";

function* execute() {
  console.log('foi')
  yield delay(2000);
  yield put(exampleSlice.actions.finish({loading: false}))
  console.log('terminou')
}

export default function* root(): any {
  yield all([yield takeLatest(exampleSlice.actions.execute, execute)]);
}
