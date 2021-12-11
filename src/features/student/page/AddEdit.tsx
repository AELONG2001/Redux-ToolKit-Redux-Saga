import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from 'features/student/components/StudentForm';

export default function AddEdit() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const history = useHistory();

  //Save student
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    (async () => {
      try {
        const listStudent: Student = await studentApi.getById(studentId);
        setStudent(listStudent);
      } catch (error) {
        console.log('Failed to fetch student details: ', error);
      }
    })();
  }, [studentId]);

  const initialState: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student,
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeftIcon />
          <Box>Back to student list</Box>
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Edit Student' : 'Add new Student '}</Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialState={initialState} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
