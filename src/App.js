import React, { useState, useMemo, useCallback, memo } from 'react';
import './App.css';
import { Box, Paper, Tooltip, IconButton, Grid, Typography, LinearProgress, Button, List, ListItem, ListItemText, ListItemIcon, Chip } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import ArchiveIcon from '@mui/icons-material/Archive';
import ComputerIcon from '@mui/icons-material/Computer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';
import CircularProgress from '@mui/material/CircularProgress';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import TodayIcon from '@mui/icons-material/Today';

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

function DailyGoals() {
  return (
    <Paper className="daily-goals-card">
      <Typography variant="h6" gutterBottom>
        Günlük Hədəflər
      </Typography>
      <div className="goal-item">
        <div className="goal-header">
          <div className="goal-title">
            <MenuBookIcon sx={{ mr: 1 }} />
            <Typography>Kitab Oxumaq</Typography>
          </div>
          <Typography variant="body2">15/30 səhifə</Typography>
        </div>
        <LinearProgress variant="determinate" value={50} sx={{ mb: 2 }} />
        <Button
          variant="outlined"
          size="small"
          startIcon={<RadioButtonUncheckedIcon />}
          sx={{ mb: 2 }}
        >
          Tamamlandı
        </Button>
      </div>

      <div className="goal-item">
        <div className="goal-header">
          <div className="goal-title">
            <WaterDropIcon sx={{ mr: 1 }} />
            <Typography>Su İçmək</Typography>
          </div>
          <Typography variant="body2">1.2/2 litr</Typography>
        </div>
        <LinearProgress variant="determinate" value={60} sx={{ mb: 2 }} />
        <Button
          variant="outlined"
          size="small"
          startIcon={<RadioButtonUncheckedIcon />}
          sx={{ mb: 2 }}
        >
          Tamamlandı
        </Button>
      </div>

      <div className="goal-item">
        <div className="goal-header">
          <div className="goal-title">
            <SelfImprovementIcon sx={{ mr: 1 }} />
            <Typography>Meditasiya</Typography>
          </div>
          <Typography variant="body2">5/10 dəqiqə</Typography>
        </div>
        <LinearProgress variant="determinate" value={50} sx={{ mb: 2 }} />
        <Button
          variant="outlined"
          size="small"
          startIcon={<CheckCircleIcon />}
          sx={{ mb: 2 }}
        >
          Tamamlandı
        </Button>
      </div>
    </Paper>
  );
}

function Notifications() {
  return (
    <Paper className="notifications-card">
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationsIcon sx={{ mr: 1 }} />
        Bildirişlər
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <WaterDropIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Su içmək vaxtı" 
            secondary="12:00 - 0.5L su için"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Oxuma hədəfi" 
            secondary="15:00 - 10 səhifə qalıb"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SelfImprovementIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Meditasiya vaxtı" 
            secondary="18:00 - 10 dəqiqə"
          />
        </ListItem>
      </List>
    </Paper>
  );
}

function DraggableTasks() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Dizayn sistemini yenilə',
      priority: 'high',
      dueDate: 'Bu gün',
      category: 'Design',
      status: 'not-started'
    },
    {
      id: '2',
      title: 'API inteqrasiyasını tamamla',
      priority: 'medium',
      dueDate: 'Sabah',
      category: 'Development',
      status: 'not-started'
    },
    {
      id: '3',
      title: 'Yeni feature test et',
      priority: 'low',
      dueDate: 'Bu həftə',
      category: 'Testing',
      status: 'not-started'
    }
  ]);

  // Memoize filtered tasks
  const notStartedTasks = useMemo(() => 
    tasks.filter(task => task.status === 'not-started'),
    [tasks]
  );

  const doneTasks = useMemo(() =>
    tasks.filter(task => task.status === 'done'),
    [tasks]
  );

  const handleDragEnd = useCallback((result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setTasks(prevTasks => {
      const newTasks = [...prevTasks];
      const taskIndex = newTasks.findIndex(task => task.id === draggableId);
      
      if (taskIndex === -1) return prevTasks;

      newTasks[taskIndex] = {
        ...newTasks[taskIndex],
        status: destination.droppableId
      };

      return newTasks;
    });
  }, []);

  const getPriorityColor = useCallback((priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  }, []);

  const TaskItem = memo(({ task, index }) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-item ${snapshot.isDragging ? 'dragging' : ''} ${task.status === 'done' ? 'done' : ''}`}
          elevation={snapshot.isDragging ? 8 : 1}
          style={{
            ...provided.draggableProps.style,
            transform: snapshot.isDragging
              ? provided.draggableProps.style?.transform
              : 'none'
          }}
        >
          <div className="task-content">
            <div className="task-main">
              <CheckCircleOutlineIcon 
                className={`task-checkbox ${task.status === 'done' ? 'checked' : ''}`}
              />
              <Typography className={`task-title ${task.status === 'done' ? 'done' : ''}`}>
                {task.title}
              </Typography>
            </div>
            
            <div className="task-meta">
              <Chip
                icon={<PriorityHighIcon />}
                label={task.priority}
                size="small"
                className="task-priority"
                style={{
                  backgroundColor: `${getPriorityColor(task.priority)}22`,
                  color: getPriorityColor(task.priority),
                  borderColor: `${getPriorityColor(task.priority)}44`
                }}
              />
              
              <Chip
                icon={<TodayIcon />}
                label={task.dueDate}
                size="small"
                className="task-due-date"
              />
              
              <Chip
                label={task.category}
                size="small"
                className="task-category"
              />
            </div>
          </div>
        </Paper>
      )}
    </Draggable>
  ));

  const TaskList = memo(({ droppableId, tasks }) => (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`tasks-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          style={{
            minHeight: '200px',
            transition: 'background-color 0.2s ease',
            willChange: 'background-color',
          }}
        >
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ));

  return (
    <Paper className="tasks-container">
      <div className="tasks-header">
        <Typography variant="h6" className="tasks-title">
          Tapşırıqlar
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          className="add-task-button"
        >
          Yeni Tapşırıq
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="columns-container">
          <Paper className="column" elevation={2}>
            <Typography variant="h6" className="column-title">
              Başlanmayıb
              <span className="task-count">{notStartedTasks.length}</span>
            </Typography>
            
            <TaskList droppableId="not-started" tasks={notStartedTasks} />
          </Paper>

          <Paper className="column done-column" elevation={2}>
            <Typography variant="h6" className="column-title">
              Tamamlandı
              <span className="task-count">{doneTasks.length}</span>
            </Typography>
            
            <TaskList droppableId="done" tasks={doneTasks} />
          </Paper>
        </div>
      </DragDropContext>
    </Paper>
  );
}

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

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={3}>
                <DailyGoals />
              </Grid>
              <Grid item xs={12} md={6}>
                <StreakStats />
              </Grid>
              <Grid item xs={12} md={3}>
                <Notifications />
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <DraggableTasks />
              </Grid>
            </Grid>
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
