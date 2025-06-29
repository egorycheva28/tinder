import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessageDTO } from '../../../types/Messenger/MessageDTO';
import { deleteMessage, editMessage } from '../../../api/messages/messages';

interface ChatWindowProps {
  messages: MessageDTO[];
  loading: boolean;
  onSend: (content: string) => void;
  selectedId: string;
  refreshMessages: () => void;
  refreshDialogs: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  loading,
  onSend,
  selectedId,
  refreshMessages,
  refreshDialogs
}) => {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);
  const [activeMsgId, setActiveMsgId] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  const sorted = useMemo(
    () => [...messages].sort((a, b) =>
      new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
    ),
    [messages]
  );

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [sorted, loading]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && draft.trim()) {
      onSend(draft.trim());
      setDraft('');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, msgId: string) => {
    e.preventDefault();
    setActiveMsgId(msgId);
    setAnchorPosition({ top: e.clientY, left: e.clientX });
  };

  const closeMenu = () => {
    setAnchorPosition(null);
  };

  const handleDelete = async () => {
    if (!activeMsgId) return;
    await deleteMessage(activeMsgId);
    closeMenu();
    setActiveMsgId(null);      
    refreshMessages();
    refreshDialogs();
  };

  const handleStartEdit = () => {
    if (!activeMsgId) return;
    const msg = messages.find(m => m.id === activeMsgId);
    if (!msg) return;
    setEditText(msg.content);
    setIsEditing(true);
    closeMenu();
  };

  const handleConfirmEdit = async () => {
    if (!activeMsgId) return;
    const newContent = editText.trim();
    try {
      await editMessage(activeMsgId, newContent);
      setIsEditing(false);
      setActiveMsgId(null);   
      refreshMessages();
      refreshDialogs();
    } catch (err) {
      console.error('Ошибка редактирования', err);
    }
  };

  if (loading && sorted.length === 0) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box
        ref={scrollRef}
        sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}
      >
        {sorted.map((msg) => {
          const isMine = msg.fromUserId !== selectedId;
          const radius = isMine ? '16px 16px 4px 16px' : '16px 16px 16px 4px';
          return (
            <Box
              key={msg.id}
              sx={{ display: 'flex', justifyContent: isMine ? 'flex-end' : 'flex-start' }}
            >
              <Box
                onContextMenu={isMine ? (e) => handleContextMenu(e, msg.id) : undefined}
                sx={{
                  position: 'relative',
                  bgcolor: isMine ? '#bbdefb' : '#e0e0e0',
                  color: '#000',
                  p: 1.5,
                  maxWidth: '70%',
                  borderRadius: radius,
                  wordBreak: 'break-word',
                  boxShadow: 2
                }}
              >
                <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.6 }}>
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
      </Box>

      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', bgcolor: '#fff', boxShadow: '0 -1px 4px rgba(0,0,0,0.1)' }}>
        <TextField
          fullWidth
          placeholder="Введите сообщение..."
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

      <Menu
        open={Boolean(anchorPosition)}
        onClose={closeMenu}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition!}
      >
        <MenuItem onClick={handleStartEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>

      <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
        <DialogTitle>Редактировать сообщение</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={2}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditing(false)}>Отмена</Button>
          <Button onClick={handleConfirmEdit} disabled={!editText.trim()}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatWindow;
