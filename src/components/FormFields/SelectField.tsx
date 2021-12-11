import { InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  options: SelectOption[];
  disabled: boolean;
}

export function SelectField({ name, label, control, options, disabled }: SelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({ name, control });
  return (
    <FormControl disabled={disabled} component="fieldset" error={invalid} size="small" fullWidth>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        label="Sort"
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
