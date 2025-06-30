import CloseIcon from '@mui/icons-material/Close';
import ReactionListPage from './ReactionListPage';
import { getDislikedUsers, removeUserPreference } from '../../api/reactions/disliked';

const DislikesPage = () => (
  <ReactionListPage
    title="Мои дизлайки"
    fetchData={getDislikedUsers}
    showTelegram={false}
    actionIcon={<CloseIcon />}
actionButtonColor="#ccc"
    onAction={removeUserPreference}

  />
);

export default DislikesPage;