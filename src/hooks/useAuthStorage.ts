import { useEffect, useState } from 'react';
import { profileUser } from '../api/profile/profileUser';

export const useAuthStorage = () => {
  const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('userId');
      setUserId(null);
      return;
    }

    (async () => {
      try {
        const profile = await profileUser();
        localStorage.setItem('userId', profile.id);
        setUserId(profile.id);
      } catch {
        localStorage.removeItem('userId');
        setUserId(null);
      }
    })();
  }, []);

  return { userId, setUserId };
};
