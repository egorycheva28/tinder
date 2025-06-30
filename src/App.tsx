import Router from './router/Router';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () =>
    <BrowserRouter>
        <Router />
    </BrowserRouter>
    ;
export default App;
