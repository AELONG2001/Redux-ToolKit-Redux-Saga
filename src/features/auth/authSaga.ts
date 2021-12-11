import { fork, take, delay, call, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    localStorage.setItem('access_token', 'yes');

    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Long Nguyen',
      })
    );

    //redirect to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(authActions.loginFailed(error as string));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');

  //redirect to login page
  yield put(push('/login'));
}

//Theo dõi hành động login => Nếu user đã login thì lắng nghe logout
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
