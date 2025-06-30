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

  const triggerSwipe = useCallback(
    (dir: 'left' | 'right') => {
      controls
        .start({
          x: dir === 'right' ? '100vw' : '-100vw',
          rotate: dir === 'right' ? 10 : -10,
          transition: { duration: 0.4 }
        })
        .then(() => {
          onSwipe(dir);
          controls.set({ x: 0, rotate: 0 });
        });
    },
    [controls, onSwipe]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') triggerSwipe('right');
      if (e.key === 'ArrowLeft') triggerSwipe('left');
    },
    [triggerSwipe]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <Box sx={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: 400, textAlign: 'center', pb: 2 }}>
        <motion.div
          animate={controls}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, info: PanInfo) => {
            if (info.offset.x > 120) triggerSwipe('right');
            if (info.offset.x < -120) triggerSwipe('left');
          }}
          style={{ cursor: 'grab' }}
        >
          <Card
            sx={{
              width: 400,
              height: 550,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 8,
              bgcolor: '#121212',
              color: 'white',
            }}
          >
            <Box sx={{ width: '100%', height: 400, position: 'relative' }}>
              {user.photoUrl ? (
                <CardMedia
                  component="img"
                  image={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#fff' }}>
                    НЕТ ФОТО
                  </Typography>
                </Box>
              )}
            </Box>
            <CardContent sx={{ py: 2, px: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#F500A1' }}>
                {user.firstName} {user.lastName}, {user.age}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#ccc' }}>
                {educationRus}, {user.course} курс
              </Typography>
              {user.about && (
                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: '#eee' }}>
                  "{user.about}"
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <IconButton
            onClick={() => triggerSwipe('left')}
            sx={{
              bgcolor: '#1E1E1E',
              boxShadow: 4,
              color: '#fff',
              '&:hover': { bgcolor: '#333' }
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() => triggerSwipe('right')}
            sx={{
              bgcolor: '#F500A1',
              boxShadow: 4,
              '&:hover': { bgcolor: '#d40085' }
            }}
          >
            <FavoriteIcon fontSize="large" sx={{ color: '#fff' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
