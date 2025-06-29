import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

interface ChatHeaderProps {
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ userId, firstName, lastName, photoUrl }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 0.5
      }}
    >
      <Avatar
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        sx={{ width: 48, height: 48, mr: 2 }}
      />
      <Typography variant="h6" component="div">
        {firstName} {lastName}
      </Typography>
    </Box>
  );
};

export default ChatHeader;
