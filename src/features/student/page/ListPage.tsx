import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityMap, selectCityList } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentFilters from '../components/studentFilters';
import StudentTable from '../components/studentTable';
import { useHistory, useRouteMatch } from 'react-router';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
  studentActions,
} from '../studentSlice';
import { toast } from 'react-toastify';

export default function ListPage() {
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const history = useHistory();

  const loading = useAppSelector(selectStudentLoading);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);

  const cityList = useAppSelector(selectCityList);
  const cityMap = useAppSelector(selectCityMap);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudentApi = async (student: Student) => {
    try {
      toast.success('Remove Student Successfully');
      await studentApi.remove(student?.id || '');

      //set filter to call useEffect(remember clone new object avoid referent type)
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {}
  };

  const handleEditStudent = async (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', width: '100%', top: '-2' }} />}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained">Add new student</Button>
        </Link>
      </Box>

      {/* Search Student */}
      <Box my={2}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Student Table */}
      <Box mt={4}>
        <StudentTable
          cityMap={cityMap}
          studentList={studentList}
          onEdit={handleEditStudent}
          onRemove={handleRemoveStudentApi}
        />
      </Box>

      {/* Pagination */}
      <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={pagination._page}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}
