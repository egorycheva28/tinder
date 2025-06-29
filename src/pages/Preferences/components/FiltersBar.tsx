import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent
} from '@mui/material';

export interface Filters {
  educationLevel: '' | 'Bachelor' | 'Master';
  course: '' | number;
  minAge: '' | number;
  maxAge: '' | number;
  gender: '' | 'Male' | 'Female';
}

export interface FiltersBarProps {
  filters: Filters;
  onChange: <K extends keyof Filters>(field: K, value: Filters[K]) => void;
}

const FiltersBar: React.FC<FiltersBarProps> = ({ filters, onChange }) => {
  const handleSelect = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    onChange(key, value);
  };

  const controlProps = { size: 'small' as const, variant: 'outlined' as const, sx: { width: 140, height: 45 } };
  const textProps = { size: 'small' as const, variant: 'outlined' as const, sx: { width: 140, height: 45 } };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
      <FormControl {...controlProps}>
        <InputLabel id="education-label">Уровень обучения</InputLabel>
        <Select
          labelId="education-label"
          label="Уровень обучения"
          value={filters.educationLevel}
          onChange={(e: SelectChangeEvent) => handleSelect('educationLevel', e.target.value as any)}
          sx={{ height: '100%' }}
        >
          <MenuItem value=""><em>Все</em></MenuItem>
          <MenuItem value="Bachelor">Бакалавриат</MenuItem>
          <MenuItem value="Master">Магистратура</MenuItem>
        </Select>
      </FormControl>

      <FormControl {...controlProps}>
        <InputLabel id="course-label">Курс</InputLabel>
        <Select<number>
          labelId="course-label"
          label="Курс"
          value={filters.course}
          onChange={e => handleSelect('course', e.target.value as number)}
          sx={{ height: '100%' }}
        >
          <MenuItem value=""><em>Все</em></MenuItem>
          {(filters.educationLevel === 'Master' ? [1, 2] : [1, 2, 3, 4]).map(n => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        {...textProps}
        type="number"
        label="Мин. возраст"
        value={filters.minAge}
        onChange={e => handleSelect('minAge', Number(e.target.value) as any)}
        InputProps={{ inputProps: { min: 0 } }}
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        {...textProps}
        type="number"
        label="Макс. возраст"
        value={filters.maxAge}
        onChange={e => handleSelect('maxAge', Number(e.target.value) as any)}
        InputProps={{ inputProps: { min: 0 } }}
        InputLabelProps={{ shrink: true }}
      />

      <FormControl {...controlProps}>
        <InputLabel id="gender-label">Пол</InputLabel>
        <Select
          labelId="gender-label"
          label="Пол"
          value={filters.gender}
          onChange={(e: SelectChangeEvent) => handleSelect('gender', e.target.value as any)}
          sx={{ height: '100%' }}
        >
          <MenuItem value=""><em>Любой</em></MenuItem>
          <MenuItem value="Male">Мужской</MenuItem>
          <MenuItem value="Female">Женский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersBar;
