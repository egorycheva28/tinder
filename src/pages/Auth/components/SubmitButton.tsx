import { Button } from '@mui/material'

interface SubmitButtonProps {
  text: string
  disabled?: boolean
  width?: number | string
  height?: number | string
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  disabled = false,
  width = '100%',
  height = 48,
}) => (
  <Button
    type="submit"
    variant="contained"
    disabled={disabled}
    sx={{
      mt: 3,
      borderRadius: 2.5,
      borderColor: '#F500A1',
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
  >
    {text}
  </Button>
)

export default SubmitButton
