import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/auth/logoutUser';
import { getNotifications } from '../api/notifications/getNotifications';
import { NotificationDTO } from '../types/Notifications/NotiificationDTO';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
      const result = await logoutUser();
      localStorage.removeItem('token');
      localStorage.removeItem('notificationsCount');
      navigate('/login');
    } catch (err: any) {
      console.error(err);
      alert('Ошибка выхода: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
    }
  };

  const getUnreadCount = async () => {
    const result: NotificationDTO[] = await getNotifications();
    if (!result) return 0;
    return result.filter(n => !n.isRead).length;
  };

  const updateNotificationsCount = async () => {
    try {
      const count = await getUnreadCount();
      localStorage.setItem('notificationsCount', count.toString());
    } catch (err) {
      console.error('Ошибка при обновлении уведомлений:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await updateNotificationsCount();

      const intervalId = setInterval(async () => {
        await updateNotificationsCount();
      }, 30000);

      return () => clearInterval(intervalId);
    };

    loadData();
  }, []);

  return (
    <AppBar sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HITS<FavoriteIcon fontSize="small" sx={{ position: 'relative', top: '2px' }} />лав
        </Typography>

        <IconButton onClick={openMenu} size="large" edge="end" color="inherit">
          <Avatar
            src={localStorage.getItem('photoUrl') || ''}
            sx={{ bgcolor: 'grey' }}>
            A
          </Avatar>
        </IconButton>

        <Menu
          open={isOpen}
          onClose={openMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ position: 'absolute', top: 43 }}
        >
          <MenuItem onClick={() => {
            navigate('/userPreferences');
            openMenu();
          }}>Главная</MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/profile');
              openMenu();
            }}>Профиль</MenuItem>
            <MenuItem onClick={() => {
              navigate('/messenger');
              openMenu();
            }}>Чаты</MenuItem>
          <MenuItem onClick={() => {
            navigate('/liked');
            openMenu();
          }}>Мои лайки</MenuItem>
          <MenuItem onClick={() => {
            navigate('/disliked');
            openMenu();
          }}>Мои дизлайки</MenuItem>
          <MenuItem onClick={() => {
            navigate('/matches');
            openMenu();
          }}>Мои мэтчи</MenuItem>
          <MenuItem onClick={() => {
            navigate('/notifications');
            openMenu();
          }}>Уведомления ({localStorage.getItem('notificationsCount')})</MenuItem>
          <MenuItem onClick={() => { logout() }}>Выход</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;