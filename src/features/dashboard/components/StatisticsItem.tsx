import { Box, Paper, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
);

const theme = createTheme();

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.root} sx={{ p: 1, m: 1 }}>
        <Box>{icon}</Box>

        <Box>
          <Typography variant="h5" align="right">
            {value}
          </Typography>
          <Typography variant="caption">{label}</Typography>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
