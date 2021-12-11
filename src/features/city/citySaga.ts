import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { takeLatest, call, put } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* fetchStudentList() {
  try {
    const listCity: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityListSuccess(listCity));
  } catch (error) {
    yield put(cityActions.fetchCityListFailed(error as string));
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList, fetchStudentList);
}
