import { ThemeProvider } from '@mui/material/styles';
import theme from './assets/styles/Theme';
import { Typography } from '@mui/material';
import MenuDrawer from './components/UI/MenuDrawer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Router>
          <MenuDrawer />
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
