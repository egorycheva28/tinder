import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessageDTO } from '../../../types/Messenger/MessageDTO';

interface ChatWindowProps {
  messages: MessageDTO[];
  loading: boolean;
  onSend: (content: string) => void;
  selectedId: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading, onSend, selectedId }) => {
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const sortedMessages = useMemo(
    () => [...messages].sort(
      (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    ),
    [messages]
  );

  useEffect(() => {
    if (!loading) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sortedMessages, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && draft.trim()) {
      onSend(draft.trim());
      setDraft('');
    }
  };

  if (loading && sortedMessages.length === 0) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5
        }}
      >
        {sortedMessages.map((msg, idx) => {
          const isMine = msg.fromUserId !== selectedId;
          const borderRadius = isMine
            ? '16px 16px 4px 16px'
            : '16px 16px 16px 4px';
          return (
            <Box
              key={idx}
              sx={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: isMine ? '#bbdefb' : '#e0e0e0',
                  color: '#000',
                  p: 1.5,
                  maxWidth: '70%',
                  borderRadius,
                  wordBreak: 'break-word',
                  boxShadow: 2,
                }}
              >
               <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 1 }}>
                  {msg.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ position: 'absolute', bottom: 4, right: 8, opacity: 0.6, fontSize: '0.65rem' }}
                >
                  {new Date(msg.sentAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={endRef} />
      </Box>

      <Box
        sx={{
          p: 1,
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#fff',
          boxShadow: '0 -1px 4px rgba(0,0,0,0.1)'
        }}
      >
        <TextField
          fullWidth
          placeholder="Введите сообщение..."
          variant="outlined"
          size="medium"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          sx={{ borderRadius: '20px', bgcolor: '#f0f0f0' }}
        />
        <IconButton
          color="primary"
          sx={{ ml: 1 }}
          disabled={!draft.trim()}
          onClick={() => {
            onSend(draft.trim());
            setDraft('');
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
