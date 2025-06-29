 import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  CircularProgress,
  Typography,
  ListItemButton
} from '@mui/material';
import { DialogDTO } from '../../../types/Messenger/DialogDTO';

interface DialogListProps {
  dialogs: DialogDTO[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (withUserId: string) => void;
}

const DialogList: React.FC<DialogListProps> = ({
  dialogs,
  loading,
  selectedId,
  onSelect
}) => {
  if (loading && dialogs.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List disablePadding>
      {dialogs.map((d, idx) => (
        <React.Fragment key={d.withUserId}>
          <ListItem disablePadding>
            <ListItemButton
              selected={d.withUserId === selectedId}
              onClick={() => onSelect(d.withUserId)}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar src={d.withPhotoUrl || undefined} />
              </ListItemAvatar>
              <ListItemText
                 primary={`${d.withFirstName} ${d.withLastName}`}
                secondary={
                  <Typography noWrap variant="body2">
                    {d.lastMessageContent}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {idx < dialogs.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DialogList; 