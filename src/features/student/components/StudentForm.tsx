import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField } from 'components/FormFields';
import { SelectField } from 'components/FormFields/SelectField';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface StudentFormProps {
  initialState: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter your name')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;

        const parts = value.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter an positive')
      .integer('Please enter an integer')
      .required()
      .min(18, 'Min is 18')
      .max(100, 'Max is 100')
      .typeError('Please enter a valid number'),
    mark: yup
      .number()
      .required()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .typeError('Please enter a valid number'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required('Please select gender'),
    city: yup.string().required('Please select city'),
  })
  .required();

export default function StudentForm({ initialState, onSubmit }: StudentFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialState,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      toast.success('Save student successfully');
      await onSubmit?.(formValues);
    } catch (error) {}
  };

  const cityOption = useAppSelector(selectCityOption);

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" label="Full Name" control={control} />

        <RadioGroupField
          name="gender"
          label="Gender"
          control={control}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          disabled={false}
        />

        <InputField name="age" label="Age" control={control} type="number" />

        <InputField name="mark" label="Mark" control={control} type="number" />

        {Array.isArray(cityOption) && cityOption.length > 0 && (
          <SelectField
            name="city"
            label="City"
            control={control}
            options={cityOption}
            disabled={false}
          />
        )}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            {isSubmitting && <CircularProgress size={16} color="secondary" />}
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
