import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Containers/Menu';
import LoginForm from './components/Containers/Forms/LoginForm';
import "./assets/styles/index.css";
import Header from './components/Containers/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { initializeLoginFromStorage } from './reducers/loginReducer';
import LogoutHandler from './components/Containers/LogoutHandler';

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLoginFromStorage());
  }
    , [dispatch]);

  return (
    <div>
      {location.pathname !== '/login' && <Menu />}
      <div style={{ paddingTop: '100px' }}></div>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutHandler />} />
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