import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLikedUsers, removeUserPreference } from '../../api/reactions/liked';
import ReactionListPage from './ReactionListPage';

const LikedPage = () => (
  <ReactionListPage
    title="Мои лайки"
    fetchData={getLikedUsers}
    showTelegram={false}
    showMatchLabel={true}
    actionIcon={<FavoriteIcon />}
    actionButtonColor="#F500A1"
    onAction={removeUserPreference}
  />
);

export default LikedPage;

