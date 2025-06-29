import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import UserPreferencesPage from '../pages/Preferences/UserPreferencesPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import Navbar from '../navbar/Navbar';
import NotificationPage from '../pages/Notifications/NotificationPage';
import LikedPage from '../pages/ReactionListPage/LikedPage';
import DislikesPage from '../pages/ReactionListPage/DislikesPage';
import MatchesPage from '../pages/ReactionListPage/MatchesPage';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/' && location.pathname !== '/register' && localStorage.getItem('token') && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userPreferences" element={<UserPreferencesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/liked" element={<LikedPage />} />
        <Route path="/disliked" element={<DislikesPage />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Routes>
    </>
  );
};

export default Router;
