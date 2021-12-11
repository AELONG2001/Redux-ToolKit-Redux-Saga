import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'hoist-non-react-statics/node_modules/@types/react';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  control: Control<any>;
}

export function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      label={label}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
      variant="outlined"
      style={{ marginBottom: 16 }}
    />
  );
}
