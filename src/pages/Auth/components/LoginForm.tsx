import React, { useState, FormEvent } from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import { LoginDTO } from '../../../types/Auth/LoginDTO';
import { loginUser } from '../../../api/auth/loginUser';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginDTO>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
       const result = await loginUser(form);
      const token = (result as any).token ?? result;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err: any) {
      console.error(err);
      alert('Ошибка входа: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: 360,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: '#2C2C2C', mb: 2 }}
        >
          Вход
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Value"
            value={form.email}
            onChange={handleChange}
          />

          <FormField
            label="Пароль"
            name="password"
            type="password"
            placeholder="Value"
            value={form.password}
            onChange={handleChange}
          />

          <SubmitButton
            text="Войти"
            disabled={loading}
          />
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: '#2C2C2C' }}
          >
            <Link href="/register" underline="none" sx={{ color: 'inherit' }}>
              Нет аккаунта?
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;
