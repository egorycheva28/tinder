import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import ReactionListPage from './ReactionListPage';
import { getMatchedUsers } from '../../api/reactions/matches';
import { UserDTO } from '../../types/Reactions/UserDTO';

const MatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const [matchedUsers, setMatchedUsers] = useState<UserDTO[]>([]);

  const handleDataLoaded = useCallback((users: UserDTO[]) => {
    setMatchedUsers(users);
  }, []);

  const handleStartChat = useCallback((userId: string) => {
    const user = matchedUsers.find(u => u.id === userId);
    if (!user) return;
    navigate(`/messenger/${userId}`, { state: { user } });
  }, [matchedUsers, navigate]);

  return (
    <ReactionListPage
      title="Страница матчей"
      fetchData={getMatchedUsers}
      showTelegram={true}
      actionIcon={<ChatIcon color="primary" />}
      onDataLoaded={handleDataLoaded}   
      onAction={handleStartChat}         
    />
  );
};

export default MatchesPage;
