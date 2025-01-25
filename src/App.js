import './App.css';
import { Box, Paper, Tooltip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ArchiveIcon from '@mui/icons-material/Archive';
import { motion } from 'framer-motion';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    primary: {
      main: '#38BDF8',
    },
    secondary: {
      main: '#818CF8',
    },
    success: {
      main: '#4ADE80',
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #38BDF8 30%, #818CF8 90%)',
          borderRadius: '12px',
          padding: '12px',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(45deg, #818CF8 30%, #38BDF8 90%)',
          },
        },
      },
    },
  },
});

const MotionIconButton = motion(IconButton);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="App">
        <Paper 
          elevation={8}
          component={motion.div}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sidebar"
        >
          <Tooltip title="Əsas Səhifə" placement="right" arrow>
            <MotionIconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-home"
            >
              <HomeIcon />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="GYM" placement="right" arrow>
            <MotionIconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-gym"
            >
              <FitnessCenterIcon />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="Yuxu" placement="right" arrow>
            <MotionIconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-sleep"
            >
              <BedtimeIcon />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="Arxiv" placement="right" arrow>
            <MotionIconButton
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="icon-archive"
            >
              <ArchiveIcon />
            </MotionIconButton>
          </Tooltip>
        </Paper>

        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="main-content"
        >
          {/* Main content will be here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
