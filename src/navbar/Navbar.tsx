import React, { useState } from 'react';
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
      navigate('/');
    } catch (err: any) {
      console.error(err);
      alert('Ошибка выхода: ' + (err.message || 'Неизвестная ошибка'));
    } finally {
    }
  };

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
          <MenuItem
            onClick={() => {
              navigate('/profile');
              openMenu();
            }}>Профиль</MenuItem>
          <MenuItem onClick={() => {
            navigate('/liked');
            openMenu();
          }}>Страница лайков</MenuItem>
          <MenuItem onClick={() => {
            navigate('/disliked');
            openMenu();
          }}>Страница дизлайков</MenuItem>
          <MenuItem onClick={() => {
            navigate('/matches');
            openMenu();
          }}>Страница мэтчей</MenuItem>
          <MenuItem onClick={() => {
            navigate('/profile');
            openMenu();
          }}>Уведомления</MenuItem>
          <MenuItem onClick={() => { logout() }}>Выход</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;