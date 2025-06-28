import { Button, ButtonProps } from '@mui/material';

interface SubmitButtonProps extends ButtonProps {
  text: string;
  width?: number | string;
  height?: number | string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled = false,
  width = '100%',
  height = 40,
  variant = 'contained',
  color = 'primary',
  ...props
}) => (
  <Button
    type="submit"
    variant={variant}
    color={color}
    disabled={disabled}
    sx={{
      mt: 3,
      borderRadius: 2.5,
      width,
      height,
      bgcolor: '#2C2C2C',
      color: '#FFFFFF',
      '&:hover': {
        bgcolor: '#1F1F1F',
      },
      '&.Mui-disabled': {
        bgcolor: '#2C2C2C',
        color: '#FFFFFF',
        opacity: 0.6,
        cursor: 'not-allowed',
      },
      '&.Mui-disabled:hover': {
        bgcolor: '#2C2C2C',
      },
    }}
    {...props}
  >
    {text}
  </Button>
);

export default SubmitButton;