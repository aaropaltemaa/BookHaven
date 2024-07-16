import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Containers/Menu';
import MenuHeader from './components/Containers/MenuHeader';
import "./assets/styles/index.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <MenuHeader />
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
