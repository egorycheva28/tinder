import React, { useEffect, useCallback } from 'react';
import { Box, IconButton, Card, CardMedia, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { motion, useAnimationControls, PanInfo } from 'framer-motion';
import { UserPreviewDTO } from '../../../types/Preferences/UserPreviewDTO';

const EDUCATION_LEVEL_TRANSLATIONS: Record<string, string> = {
  Bachelor: 'Бакалавриат',
  Master: 'Магистратура'
};

interface UserCardProps {
  user: UserPreviewDTO;
  onSwipe: (direction: 'left' | 'right') => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSwipe }) => {
  const controls = useAnimationControls();
  const educationRus = EDUCATION_LEVEL_TRANSLATIONS[user.educationLevel] || user.educationLevel;

  const handleSwipe = useCallback(
    (dir: 'left' | 'right') => {
      controls
        .start({
          x: dir === 'right' ? '100vw' : '-100vw',
          rotate: dir === 'right' ? 10 : -10,
          transition: { duration: 0.4 }
        })
        .then(() => {
          controls.set({ x: 0, rotate: 0 });
          onSwipe(dir);
        });
    },
    [controls, onSwipe]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleSwipe('right');
      if (e.key === 'ArrowLeft') handleSwipe('left');
    },
    [handleSwipe]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <Box
      sx={{
        width: '100vw',
        overflowX: 'hidden',
        overflowY: 'visible',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ width: 400, textAlign: 'center', pb: 2 }}>
        <motion.div
          animate={controls}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, info: PanInfo) => {
            if (info.offset.x > 120) handleSwipe('right');
            if (info.offset.x < -120) handleSwipe('left');
          }}
          style={{ cursor: 'grab' }}
        >
          <Card sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: 4 }}>
            {user.photoUrl ? (
              <CardMedia
                component="img"
                height="400"
                image={user.photoUrl}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <Box
                sx={{
                  height: 400,
                  backgroundColor: 'grey.300',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="h4" sx={{ color: '#fff' }}>
                  НЕТ ФОТО
                </Typography>
              </Box>
            )}
            <CardContent sx={{ py: 2, px: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {user.firstName} {user.lastName}, {user.age}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
                {educationRus}, {user.course} курс
              </Typography>
              {user.about && (
                <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                  "{user.about}"
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <IconButton onClick={() => handleSwipe('left')} sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={() => handleSwipe('right')} sx={{ bgcolor: '#fff', boxShadow: 2 }}>
            <FavoriteIcon fontSize="large" color="error" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
