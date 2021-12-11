import { RootState } from 'app/store';
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'City',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },

    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.list = action.payload.data;
      state.loading = false;
    },

    fetchCityListFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },
  },
});

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);
export const selectCityOption = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

const cityReducer = citySlice.reducer;
export default cityReducer;
