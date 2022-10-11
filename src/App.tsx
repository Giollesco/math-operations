// Routes
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './navigation'

// Theme
import { ThemeProvider, CssBaseline } from '@mui/material'
import useTheme from './theme/useTheme'

function App() {

  // Variables
  const theme = useTheme();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes/>
      </ThemeProvider>
    </Router>
  );
}

export default App;
