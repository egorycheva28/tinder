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
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                • Telegram: {user.telegram ?? 'не указан'}
              </Typography>
            )}
            {user.about && (
              <Typography variant="body2" fontStyle="italic" sx={{ display: 'block', mt: 0.5 }}>
                "{user.about}"
              </Typography>
            )}
          </>
        }
        sx={{ m: 0 }}
      />
    </ListItem>
    <Divider component="li" />
  </>
));

export default ReactionListItem;