import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import * as React from 'react';

export default function Header() {

  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Management
          </Typography>
          <Button onClick={handleLogoutClick} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
