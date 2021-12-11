import { Box, Button, makeStyles, Paper, Typography, CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },

  box: {
    padding: theme.spacing(2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.logging);

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: 'Long Nguyen',
        password: '123456',
      })
    );
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button onClick={handleLoginClick} fullWidth variant="contained" color="primary">
            {isLoggedIn && <CircularProgress size={20} color="secondary" />} Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
