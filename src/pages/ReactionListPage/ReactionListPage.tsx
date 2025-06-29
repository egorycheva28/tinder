import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Chip
} from '@mui/material';
import { UserDTO } from '../../types/Reactions/UserDTO';

interface ReactionListPageProps {
  title: string;
  fetchData: () => Promise<{ count: number; users: UserDTO[] }>;
  showTelegram?: boolean;
  showMatchLabel?: boolean;
  actionIcon: ReactNode;
  onAction: (userId: string) => void;
}

const EDUCATION_LEVEL_TRANSLATIONS: Record<string,string> = {
  Bachelor: 'Бакалавриат',
  Master: 'Магистратура',
};

const ReactionListPage: React.FC<ReactionListPageProps> = ({
  title,
  fetchData,
  showTelegram = false,
  showMatchLabel = false, 
  actionIcon,
  onAction
}) => {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await fetchData();
      setUsers(resp.users);
      setError(null);
    } catch {
      setError('Не удалось загрузить данные.');
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    load();
  }, [load]);

  const handleAction = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    onAction(userId);
  };

  return (
    <Box sx={{ p: 2, position: 'relative', top: 80 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {title} ({users.length})
      </Typography>

      {loading && <Typography></Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && (
        <List disablePadding>
          {users.map((user, idx) => (
            <React.Fragment key={user.id}>
              <ListItem
                alignItems="center"
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleAction(user.id)}>
                    {actionIcon}
                  </IconButton>
                }
                sx={{ py: 1, px: 0 }}
              >
                <ListItemAvatar sx={{ minWidth: 80, mr: 3 }}>
                  <Avatar src={user.photoUrl ?? undefined} sx={{ width: 80, height: 80 }} />
                </ListItemAvatar>
                  <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {user.firstName} {user.lastName}, {user.age}
                      </Typography>
                      {showMatchLabel && user.isMatched && (
                        <Chip label="У вас мэтч!" color="primary" size="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {EDUCATION_LEVEL_TRANSLATIONS[user.educationLevel]}, {user.course} курс
                      </Typography>
                      {showTelegram && (
                        <Typography
                          variant="body2"
                          component="span"
                          sx={{ ml: 1 }}
                        >
                          • Telegram: {user.telegram ?? 'не указан'}
                        </Typography>
                      )}
                      {user.about && (
                        <Typography
                          variant="body2"
                          fontStyle="italic"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          "{user.about}"
                        </Typography>
                      )}
                    </>
                  }
                  sx={{ m: 0 }}
                />
              </ListItem>
              {idx < users.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ReactionListPage;
