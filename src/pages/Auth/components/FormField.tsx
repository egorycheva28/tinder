import { Box, Typography, TextField } from '@mui/material';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number | string;
  height?: number | string;
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
}) => (
  <Box sx={{ mb: 1 }}>
    <Typography variant="subtitle1" sx={{ color: '#2C2C2C', mb: 0.5 }}>
      {label}
    </Typography>
    <TextField
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="dense"
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
    />
  </Box>
);

export default FormField;
