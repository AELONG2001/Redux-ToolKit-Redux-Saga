import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticItem from './components/StatisticsItem';
import {
  dashboardActions,
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from './dashboardSlice';
import BoyIcon from '@mui/icons-material/Boy';
import GirlIcon from '@mui/icons-material/Girl';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
  })
);

const theme = createTheme();

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        {/* Loading */}
        {loading && <LinearProgress sx={{ top: -1, position: 'absolute', width: '100%' }} />}

        {/* Statistics Section */}
        <Grid container>
          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<BoyIcon fontSize="large" color="primary" />}
              label="male"
              value={statistics.maleCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<GirlIcon fontSize="large" color="primary" />}
              label="female"
              value={statistics.femaleCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<BookmarkAddIcon fontSize="large" color="primary" />}
              label="mark >= 8"
              value={statistics.highMarkCount}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <StatisticItem
              icon={<BookmarkRemoveIcon fontSize="large" color="primary" />}
              label="mark <= 5"
              value={statistics.lowMarkCount}
            />
          </Grid>
        </Grid>

        {/*All Student Ranking*/}
        <Box mt={3}>
          <Typography variant="h5" align="center">
            All Students
          </Typography>
          <Grid container mt={1}>
            <Grid item xs={12} md={12} lg={6}>
              <Widget title="Student Hightest Mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>

            <Grid item xs={12} md={12} lg={6}>
              <Widget title="Student Lowest Mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>

        {/* Ranking by city */}

        <Box mt={6}>
          <Typography variant="h5" align="center">
            Student Ranking By City
          </Typography>
          <Grid container>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={6}>
                <Widget title={ranking.cityName}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
