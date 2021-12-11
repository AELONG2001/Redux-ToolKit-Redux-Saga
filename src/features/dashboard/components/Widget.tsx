import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export interface WidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: WidgetProps) {
  return (
    <Paper sx={{ m: 1, p: 1 }}>
      <Typography variant="button">{title}</Typography>

      <Box>{children}</Box>
    </Paper>
  );
}
