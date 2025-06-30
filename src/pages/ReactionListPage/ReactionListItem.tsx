// ReactionListItem.tsx (styled, with more fuchsia)
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, Box, Typography, Chip, Divider } from "@mui/material";
import { memo } from "react";

const EDUCATION_LEVEL_TRANSLATIONS: Record<string, string> = {
  Bachelor: 'Бакалавриат',
  Master: 'Магистратура',
};

const ReactionListItem = memo(({ user, actionIcon, showTelegram, showMatchLabel, handleAction }: any) => (
  <>
    <ListItem
      alignItems="center"
      secondaryAction={
        <IconButton edge="end" onClick={() => handleAction(user.id)} sx={{ color: '#F500A1' }}>
          {actionIcon}
        </IconButton>
      }
      sx={{ py: 2, px: 1 }}
    >
      <ListItemAvatar sx={{ minWidth: 80, mr: 3 }}>
        <Avatar src={user.photoUrl ?? undefined} sx={{ width: 72, height: 72, border: '2px solid #F500A1' }} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#F500A1' }}>
              {user.firstName} {user.lastName}, {user.age}
            </Typography>
            {showMatchLabel && user.isMatched && (
              <Chip label="У вас мэтч!" sx={{ bgcolor: '#F500A1', color: '#fff', fontWeight: 500 }} size="small" />
            )}
          </Box>
        }
        secondary={
          <>
            <Typography variant="body2" component="span" sx={{ color: '#ccc' }}>
              {EDUCATION_LEVEL_TRANSLATIONS[user.educationLevel]}, {user.course} курс
            </Typography>
            {showTelegram && (
              <Typography variant="body2" component="span" sx={{ ml: 1, color: '#F500A1' }}>
                • Telegram: {user.telegram ?? 'не указан'}
              </Typography>
            )}
            {user.about && (
              <Typography variant="body2" fontStyle="italic" sx={{ display: 'block', mt: 0.5, color: '#aaa' }}>
                "{user.about}"
              </Typography>
            )}
          </>
        }
        sx={{ m: 0 }}
      />
    </ListItem>
    <Divider component="li" sx={{ bgcolor: '#333' }} />
  </>
));

export default ReactionListItem;
