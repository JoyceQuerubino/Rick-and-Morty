import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ExecuteExample { 
  loading: boolean;
}

interface ExampleState {
  loading: boolean;
}

const initialState: ExampleState = {
  loading: false,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    execute: (state) => {
      state.loading = true;
    },
    finish: (state, {payload}: PayloadAction<ExecuteExample>) => {
      state.loading = payload.loading;
    },
  },
});

export default exampleSlice;
