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
       borderColor:'#333', 
       bgcolor:'#1A1A1A'
      }}
    >
      <Avatar
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        sx={{ width: 48, height: 48, mr: 2, border:'2px solid #F500A1'  }}
      />
      <Typography variant="h6" sx={{ color:'#F500A1' }}> 
        {firstName} {lastName}
      </Typography>
    </Box>
  );
};

export default ChatHeader;
