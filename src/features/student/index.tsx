import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddEdit from './page/AddEdit';
import ListPage from './page/ListPage';

export default function Students() {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEdit />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEdit />
      </Route>
    </Switch>
  );
}
