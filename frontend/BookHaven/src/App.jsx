import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user); // Assuming your login state is stored under `login`

  useEffect(() => {
    dispatch(initializeLoginFromStorage());
  }, [dispatch]);

  // If user is not logged in, render LoginForm directly
  if (!user) {
    return <LoginForm />;
  }

  return (
    <div>
      <Notification />
      {location.pathname !== '/login' && location.pathname !== '/register' && <Menu />}
      <div style={{ paddingTop: '100px' }}></div>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/register" element={<RegisterForm />} />
        {/* Add other routes here */}
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