import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from './components/Layout';
import { Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Box minWidth="80vw" minHeight="100vh" bgcolor="#121212">
          <Layout>
            <Routes>
              <Route exact path="/" element={<Notes />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </Layout>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

