import { Box, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { City, Student } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils/common';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface StudentRankingListProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentRankingListProps) {
  const [open, setOpen] = useState(false);
  const [saveStudent, setSaveStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveStudent = (student: Student) => {
    setOpen(true);
    setSaveStudent(student);
  };

  const handleRemoveConfirm = (saveStudent: Student) => {
    onRemove?.(saveStudent);
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      onEdit?.(student);
                    }}
                    color="primary"
                    sx={{ mr: 2 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      handleRemoveStudent(student);
                    }}
                    color="error"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog confirm remove student */}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Remove a student?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure remove this student? This action cannot be undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="success">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveConfirm(saveStudent as Student)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
