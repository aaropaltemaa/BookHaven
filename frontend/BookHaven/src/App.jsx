import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Menu from './components/Containers/Menu';
import LoginForm from './components/Containers/Forms/LoginForm';
import "./assets/styles/index.css";
import Header from './components/Containers/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializeLoginFromStorage } from './reducers/loginReducer';
import LogoutHandler from './components/Containers/LogoutHandler';
import Notification from './components/UI/Notifications/Notification';
import RegisterForm from './components/Containers/Forms/RegisterForm';
import Dashboard from './components/Containers/Dashboard';
import Books from './components/Containers/Discover/Books';
import Library from './components/Containers/My-Library/Library';

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    dispatch(initializeLoginFromStorage());
  }, [dispatch]);

  if (!user && location.pathname !== '/register') {
    return <LoginForm />;
  }

  return (
    <div>
      <Notification />
      {location.pathname !== '/login' && location.pathname !== '/register' && <Menu />}
      <div style={{ paddingTop: '100px' }}></div>
      {location.pathname !== '/register' && <Header /> && location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/discover" element={<Books />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
