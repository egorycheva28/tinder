import React, { useState, FormEvent } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import FormField from './FormField';
import SubmitButton from './SubmitButton';
import { RegistrationDTO } from '../../../types/Auth/RegistrationDTO';
import { registerUser } from '../../../api/auth/registerUser';
import { useNavigate } from 'react-router-dom';

const genderOptions = [
  { value: 'Male', label: 'Мужчина' },
  { value: 'Female', label: 'Женщина' },
];

const educationOptions = [
  { value: 'Bachelor', label: 'Бакалавриат' },
  { value: 'Master', label: 'Магистратура' },
];

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationDTO, string>>>({});
  const [loading, setLoading] = useState(false);

  const courseOptions =
    form.educationLevel === 'Bachelor'
      ? ['1', '2', '3', '4'].map(v => ({ value: v, label: v }))
      : ['1', '2'].map(v => ({ value: v, label: v }));

  const validate = (): boolean => {
    const e: typeof errors = {};

    if (!/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(form.firstName)) {
      e.firstName = 'Некорректное имя. С большой буквы, только буквы, длина 2–50.';
    }
    if (!/^[A-ZА-ЯЁ][A-Za-zА-Яа-яЁё]{1,49}$/.test(form.lastName)) {
      e.lastName = 'Некорректная фамилия. С большой буквы, только буквы, длина 2–50.';
    }
    if (!form.birthDate) {
      e.birthDate = 'Поле обязательно.';
    }
    if (form.password.length < 8) {
      e.password = 'Пароль должен содержать минимум 8 символов.';
    }
    if (!form.email) {
      e.email = 'Поле обязательно.';
    }
    if (!form.telegram) {
      e.telegram = 'Поле обязательно.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = <K extends keyof RegistrationDTO>(
    key: K,
    value: RegistrationDTO[K]
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const payload = { ...form, birthDate: new Date(form.birthDate).toISOString() };
      await registerUser(payload);
      navigate('/login');
      alert('Регистрация прошла успешно!');
    } catch (err: any) {
      alert('Ошибка регистрации: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0A0A0A',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          px: 1,
          width: '100%',
          maxWidth: 510,
          border: '3px solid',
          borderColor: '#F500A1',
          borderRadius: 3,
          backgroundColor: '#0A0A0A',
          overflowY: 'auto'
        }}
      >
        <Typography variant="h4" align="center" sx={{ color: '#F500A1', mb: 0.5, mt: 0.5 }}>
          Регистрация
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <FormField
            label="Имя"
            name="firstName"
            value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            width={506}
            height={34}
          />

          <FormField
            label="Фамилия"
            name="lastName"
            value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            width={506}
            height={34}
          />

          <FormField
            label="Дата рождения"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={e => handleChange('birthDate', e.target.value)}
            error={!!errors.birthDate}
            helperText={errors.birthDate}
            width={506}
            height={34}
          />

          <FormField
            label="Пол"
            name="gender"
            value={form.gender}
            onChange={e => handleChange('gender', e.target.value as 'Male' | 'Female')}
            options={genderOptions}
            error={!!errors.gender}
            helperText={errors.gender}
            width={506}
            height={34}
          />

          <FormField
            label="Уровень образования"
            name="educationLevel"
            value={form.educationLevel}
            onChange={e => handleChange('educationLevel', e.target.value as 'Bachelor' | 'Master')}
            options={educationOptions}
            error={!!errors.educationLevel}
            helperText={errors.educationLevel}
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
            error={!!errors.course}
            helperText={errors.course}
            width={506}
            height={34}
          />

          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            width={506}
            height={34}
          />

          <FormField
            label="Телеграм"
            name="telegram"
            value={form.telegram || ''}
            onChange={e => handleChange('telegram', e.target.value)}
            error={!!errors.telegram}
            helperText={errors.telegram}
            width={506}
            height={34}
          />

          <FormField
            label="Пароль"
            name="password"
            type="password"
            value={form.password}
            onChange={e => handleChange('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            width={506}
            height={34}
          />

          <SubmitButton text="Зарегистрироваться" width={506} height={38} disabled={loading} sx={{ display: 'flex', justifyContent: 'flex-start' }} />
        </Box>
      </Paper>
    </Box>
  );
};

export default RegistrationForm;
