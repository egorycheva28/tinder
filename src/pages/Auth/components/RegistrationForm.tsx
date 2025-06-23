import React, { useState, FormEvent } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import { RegistrationDTO } from '../../../types/Auth/RegistrationDTO';
import { registerUser } from '../../../api/auth/registerUser';

const genderOptions = [
  { value: 'Male', label: 'Мужчина' },
  { value: 'Female', label: 'Женщина' },
];

const educationOptions = [
  { value: 'Bachelor', label: 'Бакалавриат' },
  { value: 'Master', label: 'Магистратура' },
];

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<RegistrationDTO>({
    firstName: '',
    lastName: '',
    birthDate: '',
    educationLevel: 'Bachelor',
    course: 1,
    password: '',
    email: '',
    telegram: '',
    photoUrl: null,
    about: null,
    gender: 'Male',
  });
  const [loading, setLoading] = useState(false);

    const courseOptions =
    form.educationLevel === 'Bachelor'
      ? [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
        ]
      : [
          { value: '1', label: '1' },
          { value: '2', label: '2' },
        ];

  const handleChange = <K extends keyof RegistrationDTO>(
    key: K,
    value: RegistrationDTO[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: RegistrationDTO = {
        ...form,
        birthDate: new Date(form.birthDate).toISOString(),
      };
      await registerUser(payload);
      alert('Регистрация прошла успешно!');
    } catch (err: any) {
      console.error(err);
      alert('Ошибка регистрации: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
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
          sx={{ color: '#2C2C2C', mb: 0 }}
        >
          Регистрация
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 0, display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          <FormField
            label="Имя"
            name="firstName"
            value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            width={506}
            height={34}
          />

          <FormField
            label="Фамилия"
            name="lastName"
            value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            width={506}
            height={34}
          />

          <FormField
            label="Дата рождения"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={e => handleChange('birthDate', e.target.value)}
            width={506}
            height={34}
          />

          <FormField
            label="Пол"
            name="gender"
            value={form.gender}
            onChange={e => handleChange('gender', e.target.value as 'Male' | 'Female')}
            options={genderOptions}
            width={506}
            height={34}
          />

           <FormField
            label="Уровень образования"
            name="educationLevel"
            value={form.educationLevel}
            onChange={e => handleChange('educationLevel', e.target.value as 'Bachelor' | 'Master')}
            options={educationOptions}
            width={506}
            height={34}
          />

          <FormField
            label="Курс обучения"
            name="course"
            type="number"
            value={form.course.toString()}
            onChange={e => handleChange('course', Number(e.target.value))}
            options={courseOptions}
            width={506}
            height={34}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            width={506}
            height={34}
          />

          <FormField
            label="Телеграм"
            name="telegram"
            value={form.telegram}
            onChange={e => handleChange('telegram', e.target.value)}
            width={506}
            height={34}
          />

          <FormField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            width={506}
            height={34}
          />

          <SubmitButton
            text="Зарегистрироваться"
            width={506}
            height={38}
            disabled={loading}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
