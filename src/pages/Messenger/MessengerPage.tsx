import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DialogList from './components/DialogList';
import ChatWindow from './components/ChatWindow';
import { useDialogs } from '../../hooks/useDialogs';
import { useMessages } from '../../hooks/useMessages';
import { sendMessage } from '../../api/messages/messages';
import { DialogDTO } from '../../types/Messenger/DialogDTO';
import { UserDTO } from '../../types/Reactions/UserDTO';
import ChatHeader from './components/ChatHader';

interface LocationState {
  user?: DialogDTO | UserDTO;
}

type HeaderInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

const MessengerPage: React.FC = () => {
  const { selectedId } = useParams<{ selectedId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const {
    dialogs,
    loading: loadingDialogs,
    refresh: refreshDialogs
  } = useDialogs();
  const {
    messages,
    loading: loadingMessages,
    refresh: refreshMessages
  } = useMessages(selectedId || '');

  const [headerInfo, setHeaderInfo] = useState<HeaderInfo | null>(null);

  useEffect(() => {
    if (state?.user) {
      const u = state.user;
      if ('id' in u) {
        setHeaderInfo({
          userId: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          photoUrl: u.photoUrl ?? undefined
        });
      } else {
        setHeaderInfo({
          userId: u.withUserId,
          firstName: u.withFirstName,
          lastName: u.withLastName,
          photoUrl: u.withPhotoUrl ?? undefined
        });
      }
      return;
    }
    if (!loadingDialogs) {
      const d = dialogs.find(d => d.withUserId === selectedId);
      if (d) {
        setHeaderInfo({
          userId: d.withUserId,
          firstName: d.withFirstName,
          lastName: d.withLastName,
          photoUrl: d.withPhotoUrl ?? undefined
        });
      }
    }
  }, [state, dialogs, loadingDialogs, selectedId]);

  const handleSend = async (content: string) => {
    if (!selectedId) return;
    try {
      await sendMessage(selectedId, content);
      refreshMessages();
      refreshDialogs();
    } catch (e) {
      console.error('Ошибка при отправке сообщения', e);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '90vh', top: 70, position: 'relative', bgcolor: '#f5f5f5' }}>
  
      <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider' }}>
        <DialogList
          dialogs={dialogs}
          loading={loadingDialogs}
          selectedId={selectedId || null}
          onSelect={id => navigate(`/messenger/${id}`)}
        />
      </Box>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {!headerInfo ? (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <ChatHeader
              userId={headerInfo.userId}
              firstName={headerInfo.firstName}
              lastName={headerInfo.lastName}
              photoUrl={headerInfo.photoUrl}
            />
            <ChatWindow
              messages={messages}
              loading={loadingMessages}
              selectedId={selectedId!}
              onSend={handleSend}
              refreshMessages={refreshMessages}
              refreshDialogs={refreshDialogs}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default MessengerPage;
