import Router from './router/Router';
import './App.css';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <AuthProvider>  
    <Router />
  </AuthProvider>
);
export default App;
