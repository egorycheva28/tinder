import CloseIcon from '@mui/icons-material/Close';
import ReactionListPage from './ReactionListPage';
import { getDislikedUsers, removeUserPreference } from '../../api/reactions/disliked';

const DislikesPage = () => (
  <ReactionListPage
    title="Страница дизлайков"
    fetchData={getDislikedUsers}
    showTelegram={false}
    actionIcon={<CloseIcon color="action" />}
    onAction={removeUserPreference}
  />
);

export default DislikesPage;