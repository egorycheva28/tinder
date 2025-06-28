import React, { useEffect, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { getNextUserPreview } from '../../api/preferences/UserPreferences';
import { UserPreviewDTO } from '../../types/Preferences/UserPreviewDTO';
import UserCard from './components/UserCard';

export const UserPreferencesPage: React.FC = () => {
  const [current, setCurrent] = useState<UserPreviewDTO | null>(null);
  const [next, setNext]       = useState<UserPreviewDTO | null>(null);
  const [error, setError]     = useState<string | null>(null);

  const loadNext = useCallback(async () => {
    try {
      const data = await getNextUserPreview();
      setNext(data);
      setError(null);
    } catch {
      setError('Не удалось загрузить профиль.');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const first = await getNextUserPreview();
        if (!mounted) return;
        setCurrent(first);

        const second = await getNextUserPreview();
        if (!mounted) return;
        setNext(second);

        setError(null);
      } catch {
        if (mounted) setError('Не удалось загрузить профиль.');
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSwipe = useCallback(
    (dir: 'left' | 'right') => {
      console.log('Swiped', dir);
      if (next) {
        setCurrent(next);
        loadNext();
      }
    },
    [next, loadNext]
  );

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Анкеты пользователей
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {!current && !error && <Typography>Загрузка профиля…</Typography>}

      {current && <UserCard user={current} onSwipe={handleSwipe} />}
    </Box>
  );
};

export default UserPreferencesPage;
