import './App.css';
import { Box, Paper, Tooltip, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ArchiveIcon from '@mui/icons-material/Archive';
import ComputerIcon from '@mui/icons-material/Computer';
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
});

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

const MotionIconButton = motion(IconButton);

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="App">
        <Paper 
          elevation={4}
          component={motion.div}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: "tween", duration: 0.3 }}
          className="sidebar"
        >
          <Tooltip title="Əsas Səhifə" placement="right" arrow>
            <MotionIconButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "tween", duration: 0.15 }}
              className="icon-home"
            >
              <HomeIcon sx={{ fontSize: 32 }} />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="GYM" placement="right" arrow>
            <MotionIconButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "tween", duration: 0.15 }}
              className="icon-gym"
            >
              <FitnessCenterIcon sx={{ fontSize: 32 }} />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="Olimpiada" placement="right" arrow>
            <MotionIconButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "tween", duration: 0.15 }}
              className="icon-olympiad"
            >
              <ComputerIcon sx={{ fontSize: 32 }} />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="Yuxu" placement="right" arrow>
            <MotionIconButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "tween", duration: 0.15 }}
              className="icon-sleep"
            >
              <BedtimeIcon sx={{ fontSize: 32 }} />
            </MotionIconButton>
          </Tooltip>

          <Tooltip title="Arxiv" placement="right" arrow>
            <MotionIconButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ type: "tween", duration: 0.15 }}
              className="icon-archive"
            >
              <ArchiveIcon sx={{ fontSize: 32 }} />
            </MotionIconButton>
          </Tooltip>
        </Paper>

        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="main-content"
        >
          {/* Main content will be here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
