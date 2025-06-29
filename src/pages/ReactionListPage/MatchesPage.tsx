import ChatIcon from '@mui/icons-material/Chat';
import ReactionListPage from './ReactionListPage';
import { getMatchedUsers } from '../../api/reactions/matches';

const MatchesPage = () => (
  <ReactionListPage
    title="Мои мэтчи"
    fetchData={getMatchedUsers}
    showTelegram={true}
    actionIcon={<ChatIcon color="primary" />}
    onAction={(id) => {
      /* заглушка: начать чат */
      console.log('Start chat with', id);
    }}
  />
);

export default MatchesPage;