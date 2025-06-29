import React, { useState, FormEvent } from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import { LoginDTO } from '../../../types/Auth/LoginDTO';
import { loginUser } from '../../../api/auth/loginUser';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<LoginDTO>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginDTO> & { auth?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.email) {
      e.email = 'Поле обязательно.';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      e.email = 'Неверный формат email.';
    }
    if (!form.password) {
      e.password = 'Поле обязательно.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined, auth: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(form);
      const token = typeof result === 'string' ? result : result?.token;
      if (!token) throw new Error('Token not received');

      localStorage.setItem('token', token);
      navigate('/userPreferences');
    } catch (err: any) {
      if (err.validationErrors) {
        setErrors(err.validationErrors);
      } else {
        setErrors({ auth: err.message || 'Неверный логин или пароль' });
      }
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
        <Typography variant="h5" align="center" sx={{ color: '#2C2C2C', mb: 2 }}>
          Вход
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            width="100%"
          />

          <FormField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            width="100%"
          />

          {errors.auth && (
            <Typography color="error" sx={{ textAlign: 'left', m: 0 }}>
              {errors.auth}
            </Typography>
          )}

          <SubmitButton text="Войти" disabled={loading} width="100%" />
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" component="div" sx={{ color: '#2C2C2C' }}>
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
