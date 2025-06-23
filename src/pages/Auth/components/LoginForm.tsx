import React, { useState } from 'react';
import { Box, Paper, Typography, Link } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit', form);
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
