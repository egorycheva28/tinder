import React from 'react';
import { Box, Typography, TextField, MenuItem } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value: string | number | Date;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number | string;
  height?: number | string;
  options?: Option[];
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
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
  disabled,
  error = false,
  helperText = ''
}) => {
  if (disabled) {
    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" sx={{ color: '#2C2C2C', mb: 0.5, fontWeight: 600 }}>
          {label}
        </Typography>
        <Typography variant="body1">{value.toLocaleString()}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ mb: 0.1 }}>
      <Typography variant="subtitle1" sx={{ color: '#2C2C2C', mb: 0.1, fontWeight: 600 }}>
        {label}
      </Typography>
      <TextField
        disabled={disabled}
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
        /*FormHelperTextProps={{
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
        }}*/
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
};

export default FormField;
