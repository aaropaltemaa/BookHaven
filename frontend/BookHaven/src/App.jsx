import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Containers/Menu';
import LoginForm from './components/Containers/Forms/LoginForm';
import "./assets/styles/index.css";
import Header from './components/Containers/Header';

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Menu />}
      <div style={{ paddingTop: '100px' }}></div>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<LoginForm />} />
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