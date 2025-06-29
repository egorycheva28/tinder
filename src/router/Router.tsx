import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import UserPreferencesPage from '../pages/Preferences/UserPreferencesPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import Navbar from '../navbar/Navbar';
import NotificationPage from '../pages/Notifications/NotificationPage';
import LikedPage from '../pages/ReactionListPage/LikedPage';
import DislikesPage from '../pages/ReactionListPage/DislikesPage';
import MatchesPage from '../pages/ReactionListPage/MatchesPage';


//const location = useLocation();
const Router: React.FC = () => (
  <BrowserRouter>
    {/*{location.pathname !== '/login' && location.pathname !== '/' && location.pathname !== '/register' && localStorage.getItem('token') && <Navbar />}*/}
    {localStorage.getItem('token') && <Navbar />}
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<UserPreferencesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/liked" element={<LikedPage />} />
      <Route path="/disliked" element={<DislikesPage />} />
      <Route path="/matches" element={<MatchesPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
