import React from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number | string;
  height?: number | string;
  options?: Option[];
  error?: boolean;
  helperText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  width = '100%',
  height,
  options,
  error = false,
  helperText = '',
}) => (
  <Box sx={{ mb: 0 }}>
    <Typography variant="subtitle1" sx={{ color: '#2C2C2C', mb: 0 }}>
      {label}
    </Typography>
    <TextField
      select={Boolean(options)}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="dense"
      error={error}
      helperText={helperText}
      FormHelperTextProps={{
        sx: {
          textAlign: 'left',
          margin: 0,
        }
      }}
           InputProps={{
        sx: {
          '& .MuiOutlinedInput-input': {
            padding: '4px 8px',
          },
        }
      }}
      sx={{
        width,
        ...(height ? { height } : {}),
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          ...(height ? { height } : {}),
          '&.Mui-focused fieldset': {
            borderColor: '#2C2C2C',
          },
        },
      }}
    >
      {options?.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

export default FormField;
