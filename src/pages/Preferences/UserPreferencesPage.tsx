import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { getNextUserPreview, setUserPreference } from '../../api/preferences/UserPreferences';
import { UserPreviewDTO } from '../../types/Preferences/UserPreviewDTO';
import UserCard from './components/UserCard';
import FiltersBar, { Filters } from './components/FiltersBar';


const UserPreferencesPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    educationLevel: '',
    course: '',
    minAge: '',
    maxAge: '',
    gender: '',
  });

  const [current, setCurrent] = useState<UserPreviewDTO | null>(null);
  const [next, setNext] = useState<UserPreviewDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [noMoreMessage, setNoMoreMessage] = useState<string | null>(null);

  const handleFilterChange = <K extends keyof Filters>(field: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const loadNext = useCallback(async () => {
    try {
      const data = await getNextUserPreview(filters);
      setNext(data);
      setError(null);
      setNoMoreMessage(null);
    } catch (e: any) {
      if (e.response?.status === 400 && e.response.data?.Message) {
        setNoMoreMessage(e.response.data.Message);
        setCurrent(null);
        setNext(null);
      } else {
        setError('Не удалось загрузить профиль.');
      }
    }
  }, [filters]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const first = await getNextUserPreview(filters);
        if (!mounted) return;
        setCurrent(first);

        const second = await getNextUserPreview(filters);
        if (!mounted) return;
        setNext(second);
        setError(null);
        setNoMoreMessage(null);
      } catch (e: any) {
        if (!mounted) return;
        if (e.response?.status === 400 && e.response.data?.Message) {
          setNoMoreMessage(e.response.data.Message);
        } else {
          setError('');
        }
      }
    })();
    return () => { mounted = false; };
  }, [filters]);

  const handleSwipe = useCallback(
    async (dir: 'left' | 'right') => {
      if (!current) return;
      const isLiked = dir === 'right';
      setCurrent(null);

      try {
        await setUserPreference(current.id, isLiked);
      } catch (e) {
        console.error('Ошибка при отправке лайка/дизлайка', e);
      }

      if (next) {
        setCurrent(next);
      }
      loadNext();
    },
    [current, next, loadNext]
  );

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Анкеты пользователей
      </Typography>

      <FiltersBar filters={filters} onChange={handleFilterChange} />

      {error && <Typography color="error">{error}</Typography>}
      {noMoreMessage && (
        <Typography color="textSecondary" sx={{ mt: 4, textAlign: 'center' }}>
          {noMoreMessage}
        </Typography>
      )}

      {!current && !error && !noMoreMessage && (
        <Typography></Typography>
      )}

      {current && !noMoreMessage && (
        <Box sx={{ mt: 2 }}>
          <UserCard user={current} onSwipe={handleSwipe} />
        </Box>
      )}
    </Box>
  );
};

export default UserPreferencesPage;
