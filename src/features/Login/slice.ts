import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../reducers';
import {LoginRequest} from '../../types';

type State = {
  loginLoading: boolean;
  loginDone: boolean;
  loginError: null | any;
  me: null | any;
};
const initialState: State = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  me: null,
};

const reducers = {
  loginRequest: (state: State, action: PayloadAction<LoginRequest>) => {
    state.loginLoading = true;
  },
  loginSuccess: (state: State, data: PayloadAction<any>) => {
    state.loginLoading = false;
    state.loginDone = true;
    state.me = data;
  },
  loginFailure: (state: State, {payload: error}: any) => {
    state.loginLoading = false;
    state.loginDone = false;
    state.loginError = error;
  },
};

const name: string = 'login';
export const loginSlice = createSlice({
  name,
  initialState,
  reducers,
});
const selectAllState = createSelector(
  (state: State) => state.loginLoading,
  (state: State) => state.loginDone,
  (state: State) => state.loginError,
  (state: State) => state.me,
  (loginLoading, loginDone, loginError, me) => {
    return {
      loginLoading,
      loginDone,
      loginError,
      me,
    };
  },
);

export const login = loginSlice.name;
export const loginReducer = loginSlice.reducer;
export const loginAction = loginSlice.actions;

export const addPostSelector = {
  all: (state: RootState) => selectAllState(state[login]),
};
