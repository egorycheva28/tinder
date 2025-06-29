import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLikedUsers, removeUserPreference } from '../../api/reactions/liked';
import ReactionListPage from './ReactionListPage';

const LikedPage = () => (
  <ReactionListPage
    title="Страница лайков"
    fetchData={getLikedUsers}
    showTelegram={false}
    showMatchLabel={true}  
    actionIcon={<FavoriteIcon color="error" />}
    onAction={removeUserPreference}
  />
);

export default LikedPage;

