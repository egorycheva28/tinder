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
    <List disablePadding  sx={{ bgcolor: '#0A0A0A' }}>
      {dialogs.map((d, idx) => (
        <React.Fragment key={d.withUserId}>
          <ListItem disablePadding>
            <ListItemButton
              selected={d.withUserId === selectedId}
              onClick={() => onSelect(d.withUserId)}
              alignItems="flex-start"
              sx={{ '&.Mui-selected': { bgcolor: '#1A1A1A' } }}
            >
              <ListItemAvatar>
                <Avatar src={d.withPhotoUrl || undefined} 
                 sx={{ border: '2px solid #F500A1' }} />
              </ListItemAvatar>
              <ListItemText
                  primary={<Box component="span" sx={{ color: '#F500A1', fontWeight:600 }}>{`${d.withFirstName} ${d.withLastName}`}</Box>}
                secondary={<Box component="span" sx={{ color: '#ccc' }}>{d.lastMessageContent}</Box>}
              />
            </ListItemButton>
          </ListItem>
          {idx < dialogs.length - 1 && <Divider component="li"  sx={{ bgcolor: '#333' }} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DialogList; 