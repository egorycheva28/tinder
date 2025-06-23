import React, { useState } from 'react';
import { Box, Paper, Typography, Link } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dob: string;
  course: string;
  email: string;
  telegram: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    dob: '',
    course: '',
    email: '',
    telegram: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('register', form);
  };

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          width: '100%',
          maxWidth: 510,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 3,
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ color: '#2C2C2C', mb: 0.5 }}
        >
          Регистрация
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormField
            label="Имя"
            name="firstName"
            placeholder="Value"
            value={form.firstName}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Фамилия"
            name="lastName"
            placeholder="Value"
            value={form.lastName}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Дата рождения"
            name="dob"
            type="date"
            placeholder="Value"
            value={form.dob}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Курс обучения"
            name="course"
            placeholder="Value"
            value={form.course}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="Value"
            value={form.email}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Телеграм"
            name="telegram"
            placeholder="Value"
            value={form.telegram}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <FormField
            label="Пароль"
            name="password"
            type="password"
            placeholder="Value"
            value={form.password}
            onChange={handleChange}
            width={506}
            height={40}
          />

          <SubmitButton
            text="Зарегистрироваться"
            width={506}
            height={40}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
