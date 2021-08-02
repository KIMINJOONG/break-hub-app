import {PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosError, AxiosResponse} from 'axios';
import {all, fork, put, takeLatest, call} from 'redux-saga/effects';
import {LoginRequest} from '../../types';
import {loginAction} from './slice';

function loginAPI(data: LoginRequest) {
  return axios.post('login', data);
}
function* login(action: PayloadAction<LoginRequest>) {
  const {loginSuccess, loginFailure} = loginAction;
  const data: LoginRequest = {
    email: action.payload.email,
    password: action.payload.password,
  };
  try {
    const result: AxiosResponse<any> = yield call(loginAPI, data);
    console.log(111, result);
    // yield put(loginSuccess(result.data));
  } catch (error: any | AxiosError) {
    if (axios.isAxiosError(error)) {
      console.log(error.code, error.message);
    } else {
      console.log(error.message);
    }

    // yield put(loginFailure(err));
  }
}

export function* watchLogin() {
  const {loginRequest} = loginAction;
  yield takeLatest(loginRequest, login);
}

export default function* postSaga() {
  yield all([fork(watchLogin)]);
}
