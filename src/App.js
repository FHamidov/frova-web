import './App.css';
import { Box, Paper, Tooltip, IconButton, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ArchiveIcon from '@mui/icons-material/Archive';
import ComputerIcon from '@mui/icons-material/Computer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';

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

// Dummy data for contribution graph
const generateContributionData = () => {
  const data = [];
  for (let week = 0; week < 52; week++) {
    const weekData = [];
    for (let day = 0; day < 7; day++) {
      weekData.push({
        count: Math.floor(Math.random() * 5),
        date: new Date(2024, 0, week * 7 + day + 1)
      });
    }
    data.push(weekData);
  }
  return data;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    y: -20,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const graphVariants = {
  hidden: { 
    y: 20,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.4
    }
  }
};

function StreakStats() {
  return (
    <div className="streak-stats">
      <div className="streak-item current">
        <div className="streak-icon">
          <LocalFireDepartmentIcon sx={{ fontSize: 32, color: '#38BDF8' }} />
        </div>
        <Typography variant="h3" className="streak-value">7</Typography>
        <Typography variant="body2" className="streak-label">
          Cari Streak
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'inline-block', marginLeft: '4px' }}
          >
            🔥
          </motion.div>
        </Typography>
      </div>
      <div className="streak-item longest">
        <div className="streak-icon">
          <WhatshotIcon sx={{ fontSize: 32, color: '#4ADE80' }} />
        </div>
        <Typography variant="h3" className="streak-value">21</Typography>
        <Typography variant="body2" className="streak-label">
          Ən Uzun Streak
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            style={{ display: 'inline-block', marginLeft: '4px' }}
          >
            🔥
          </motion.div>
        </Typography>
      </div>
      <div className="streak-item total">
        <div className="streak-icon">
          <LocalFireDepartmentIcon sx={{ fontSize: 32, color: '#F472B6' }} />
        </div>
        <Typography variant="h3" className="streak-value">156</Typography>
        <Typography variant="body2" className="streak-label">
          Toplam Aktiv Gün
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            style={{ display: 'inline-block', marginLeft: '4px' }}
          >
            🔥
          </motion.div>
        </Typography>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, gradient, percentage }) {
  return (
    <motion.div variants={cardVariants}>
      <Paper 
        className="stat-card"
        style={{
          background: `linear-gradient(135deg, ${gradient})`
        }}
      >
        <div className="stat-content">
          <div className="stat-text">
            <Typography variant="h6" className="stat-title">
              {title}
            </Typography>
            <Typography variant="h4" className="stat-value">
              {value}
            </Typography>
            <Typography variant="body2" className="stat-subtitle">
              {subtitle}
            </Typography>
          </div>
          <div className="stat-chart">
            <div className="progress-ring">
              <CircularProgress
                variant="determinate"
                value={100}
                size={80}
                thickness={3}
                sx={{
                  color: 'rgba(255, 255, 255, 0.1)',
                  position: 'absolute'
                }}
              />
              <CircularProgress
                variant="determinate"
                value={percentage}
                size={80}
                thickness={3}
                sx={{
                  color: 'white',
                  position: 'absolute',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  }
                }}
              />
              <Typography
                variant="caption"
                component="div"
                className="progress-label"
              >
                {percentage}%
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
    </motion.div>
  );
}

function App() {
  const contributionData = generateContributionData();

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Stats Cards in full width */}
            <Grid container spacing={2} className="stats-container">
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Yuxu Keyfiyyəti"
                  value="85%"
                  subtitle="Aylıq ortalama"
                  gradient="#38BDF8, #818CF8"
                  percentage={85}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Tamamlanmış Tapşırıqlar"
                  value="92%"
                  subtitle="Bu gün"
                  gradient="#818CF8, #4ADE80"
                  percentage={92}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="Çəki Artımı"
                  value="+2.5%"
                  subtitle="Son 30 gün"
                  gradient="#4ADE80, #F472B6"
                  percentage={65}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  title="İnformatika Məsələləri"
                  value="147"
                  subtitle="Həll edilmiş"
                  gradient="#F472B6, #38BDF8"
                  percentage={78}
                />
              </Grid>
            </Grid>

            {/* Contribution Graph below cards */}
            <motion.div 
              variants={graphVariants}
              className="graph-section"
            >
              <Paper className="graph-container">
                <div className="graph-header">
                  <Typography variant="h6" className="graph-title">
                    Aktivlik Tarixçəsi
                  </Typography>
                  <StreakStats />
                </div>
                <div className="contribution-graph">
                  {contributionData.map((week, weekIndex) => (
                    <div key={weekIndex} className="contribution-week">
                      {week.map((day, dayIndex) => (
                        <Tooltip 
                          key={dayIndex}
                          title={`${day.date.toLocaleDateString()} - ${day.count} tapşırıq`}
                          arrow
                        >
                          <div 
                            className={`contribution-day level-${day.count}`}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  ))}
                </div>
              </Paper>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
