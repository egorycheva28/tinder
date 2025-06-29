import React, { ReactNode, useEffect, useState, useCallback, memo } from 'react';
import {
  Box,
  Typography,
  List,
} from '@mui/material';
import { UserDTO } from '../../types/Reactions/UserDTO';
import ReactionListItem from './ReactionListItem';

interface ReactionListPageProps {
  title: string;
  fetchData: () => Promise<{ count: number; users: UserDTO[] }>;
  showTelegram?: boolean;
  showMatchLabel?: boolean;
  actionIcon: ReactNode;
  onAction: (userId: string) => void;
  onDataLoaded?: (users: UserDTO[]) => void;
}

const ReactionListPage: React.FC<ReactionListPageProps> = memo(({
  title,
  fetchData,
  showTelegram = false,
  showMatchLabel = false,
  actionIcon,
  onAction,
  onDataLoaded,
}) => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchData()
      .then((resp) => {
        if (isMounted) {
          setUsers(resp.users);
          setError(null);
          onDataLoaded?.(resp.users);
        }
      })
      .catch(() => setError('Не удалось загрузить данные.'))
      .finally(() => isMounted && setLoading(false));

    return () => { isMounted = false; };
  }, [fetchData, onDataLoaded]);

  const handleAction = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    onAction(userId);
  }, [onAction]);

  return (
    <Box sx={{ p: 2, position: 'relative', top: 80 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {title} ({users.length})
      </Typography>

      {loading && <Typography>Загрузка...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <List disablePadding>
          {users.map((user) => (
            <ReactionListItem
              key={user.id}
              user={user}
              actionIcon={actionIcon}
              showTelegram={showTelegram}
              showMatchLabel={showMatchLabel}
              handleAction={handleAction}
            />
          ))}
        </List>
      )}
    </Box>
  );
});

export default ReactionListPage;
