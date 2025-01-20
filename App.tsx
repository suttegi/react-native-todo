import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
  Modal,
  Alert
} from 'react-native';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Task from './components/Task';
import TaskDetail from './components/TaskDetail';
import { getStyles } from './styles/AppStyle';
import { format } from 'date-fns';
import { MapPin, SortAsc, SortDesc } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { TaskItem, TaskStatus, LogEntry  } from './types';
import TaskLog from './components/TaskLog';

//config for notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const TASKS_KEY = '@tasks';
const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_LOCATION_LENGTH = 60;
const LOGS_KEY = '@logs';


const saveTasksToStorage = async (tasks: TaskItem[]) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

const loadTasksFromStorage = async (): Promise<TaskItem[]> => {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

const saveLogsToStorage = async (logs: LogEntry[]) => {
  try {
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Failed to save logs:', error);
  }
};

const loadLogsFromStorage = async (): Promise<LogEntry[]> => {
  try {
    const storedLogs = await AsyncStorage.getItem(LOGS_KEY);
    return storedLogs ? JSON.parse(storedLogs) : [];
  } catch (error) {
    console.error('Failed to load logs:', error);
    return [];
  }
};


type SortOption = 'date' | 'status';
type SortDirection = 'asc' | 'desc';

const AppContent: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const styles = getStyles(isDarkMode);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskLocation, setTaskLocation] = useState<string>('');
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [selectedFiles, setSelectedFiles] = useState<string[]> ([]);
  const [taskSchedule, setTaskSchedule] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'tasks' | 'logs'>('tasks');

  //request permissions
  useEffect(() => {
    (async () => {
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      if (notificationStatus !== 'granted') {
        Alert.alert('Permissions required', 'Please enable notifications to receive reminders');
      }
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert('Permissions required', 'Please enable location services to use current location');
      }
    })();
  }, []);


  //get location
  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      
      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address) {
        const locationString = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim();
        setTaskLocation(locationString);
        setUseCurrentLocation(true);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    }
  };
  
  const scheduleNotification = async (taskTitle: string, scheduledDate: Date) => {
    const triggerDate = new Date(scheduledDate.getTime() - 15 * 60000); 
    
    try {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Upcoming Task',
          body: `Task "${taskTitle}" is starting in 30 minutes`,
        },
        trigger: triggerDate,
      });
      return notificationId;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return null;
    }
  };

  // load tasks on app start
  useEffect(() => {
    (async () => {
      const loadedTasks = await loadTasksFromStorage();
      setTaskItems(loadedTasks);
    })();
  }, []);

  // save tasks whenever they change
  useEffect(() => {
    saveTasksToStorage(taskItems);
  }, [taskItems]);
  


  
  

  const handleSelectedFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false, 
      });
      if (result.assets && result.assets.length > 0) {
        const fileUri = result.assets[0].uri;  
        setSelectedFiles((prevFiles) => [...prevFiles, fileUri]); 
      }
    } catch (error) {
      alert("error")
    }
  }

  const addLogEntry = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog: LogEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: format(new Date(), 'PPP pp'),
    };
    setLogs(prevLogs => [newLog, ...prevLogs]);
  };

  const handleAddTask = async (): Promise<void> => {

    // validate input
    if (!taskTitle.trim()) {
      alert('Task title is required!');
      return;
    }
  
    if (taskTitle.length > MAX_TITLE_LENGTH) {
      alert('Task title cannot exceed 50 characters!');
      return;
    }
  
    if (taskDescription.length > MAX_DESCRIPTION_LENGTH) {
      alert('Task description cannot exceed 200 characters!');
      return;
    }

    if (taskLocation.length > MAX_LOCATION_LENGTH) {
      alert('Location cannot exceed 30 characters');
      return;
    }
  
    let notificationId: string | undefined;
    if (taskSchedule) {
      const id = await scheduleNotification(taskTitle, taskSchedule);
      notificationId = id ?? undefined;
    }

    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      location: taskLocation.trim() || undefined,
      coordinates: useCurrentLocation && currentLocation ? {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      } : undefined,
      createdAt: format(new Date(), 'PPP pp'),
      status: 'In Progress',
      files: selectedFiles,
      scheduledFor: taskSchedule ? format(taskSchedule, 'PPP pp') : undefined,
      notificationId,
    };


  
    setTaskItems([...taskItems, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setTaskLocation('');
    setSelectedFiles([]);
    setTaskSchedule(null);
    setUseCurrentLocation(false);
    setCurrentLocation(null);
    setTaskItems([...taskItems, newTask]);
  
    addLogEntry({
      taskId: newTask.id,
      taskTitle: newTask.title,
      action: 'created',
      details: 'Task created',
    });
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus): void => {
    setTaskItems(taskItems.map(task => {
      if (task.id === id) {
        addLogEntry({
          taskId: task.id,
          taskTitle: task.title,
          action: 'status_changed',
          details: `Status changed from ${task.status} to ${newStatus}`,
          oldValue: task.status,
          newValue: newStatus,
        });
  
        return {
          ...task,
          status: newStatus,
          lastUpdated: format(new Date(), 'PPP pp'),
        };
      }
      return task;
    }));
  };

  const deleteTask = async (id: string): Promise<void> => {
    const task = taskItems.find(task => task.id === id);
    if (task) {
      addLogEntry({
        taskId: task.id,
        taskTitle: task.title,
        action: 'deleted',
        details: 'Task deleted',
      });
    }
    if (task?.notificationId) {
      await Notifications.cancelScheduledNotificationAsync(task.notificationId);
    }
    setTaskItems(taskItems.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedAndFilteredTasks = useMemo(() => {
    let filtered = taskItems;
    
    // status of task
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // filter tasks
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortDirection === 'asc' 
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }
    });
  }, [taskItems, sortBy, sortDirection, statusFilter]);

  useEffect(() => {
    (async () => {
      const loadedLogs = await loadLogsFromStorage();
      setLogs(loadedLogs);
    })();
  }, []);
  
  useEffect(() => {
    saveLogsToStorage(logs);
  }, [logs]);
  

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tasks' && styles.activeTab]} 
          onPress={() => setActiveTab('tasks')}
        >
          <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'logs' && styles.activeTab]} 
          onPress={() => setActiveTab('logs')}
        >
          <Text style={[styles.tabText, activeTab === 'logs' && styles.activeTabText]}>Activity Log</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'tasks' ? (
        <>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>#TODO list</Text>
                <Text style={styles.taskCount}>
                  {sortedAndFilteredTasks.length} tasks
                </Text>
              </View>
              <View style={styles.themeSwitch}>
                <Text style={styles.themeSwitchText}>☀️</Text>
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleTheme}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                />
                <Text style={styles.themeSwitchText}>🌙</Text>
              </View>
            </View>

            <View style={styles.filterContainer}>
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[styles.filterButton, statusFilter === 'All' && styles.activeFilter]}
                  onPress={() => setStatusFilter('All')}
                >
                  <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>
                {(['In Progress', 'Completed', 'Cancelled'] as TaskStatus[]).map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={[styles.filterButton, statusFilter === status && styles.activeFilter]}
                    onPress={() => setStatusFilter(status)}
                  >
                    <Text style={styles.filterText}>{status}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortBy('date')}
                >
                  <Text style={[styles.sortText, sortBy === 'date' && styles.activeSortText]}>Date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortBy('status')}
                >
                  <Text style={[styles.sortText, sortBy === 'status' && styles.activeSortText]}>Status</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleSort}>
                  {sortDirection === 'asc' ? (
                    <SortAsc size={24} color={isDarkMode ? '#fff' : '#000'} />
                  ) : (
                    <SortDesc size={24} color={isDarkMode ? '#fff' : '#000'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tasksWrapper}>
              {sortedAndFilteredTasks.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>empty</Text>
                  <Text style={styles.emptyStateSubtext}>
                    {statusFilter !== 'All' 
                      ? `No ${statusFilter.toLowerCase()} tasks`
                      : 'add a task'}
                  </Text>
                </View>
              ) : (
                <View style={styles.items}>
                  {sortedAndFilteredTasks.map((item) => (
                    <Task
                      key={item.id}
                      task={item}
                      onPress={() => setSelectedTask(item)}
                      onStatusChange={(status) => updateTaskStatus(item.id, status)}
                      onDelete={() => deleteTask(item.id)}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.writeTaskWrapper}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.titleInput]}
                placeholder="Task title"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor={isDarkMode ? '#888' : '#666'}
                value={taskDescription}
                onChangeText={setTaskDescription}
                multiline
              />
              <View style={styles.locationContainer}>
                <TextInput
                  style={[styles.input, styles.locationInput]}
                  placeholder="Location (optional)"
                  placeholderTextColor={isDarkMode ? '#888' : '#666'}
                  value={taskLocation}
                  onChangeText={setTaskLocation}
                  editable={!useCurrentLocation}
                />
                <TouchableOpacity 
                  style={styles.locationButton}
                  onPress={getCurrentLocation}
                >
                  <MapPin size={24} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.scheduleButtonText}>
                  {taskSchedule 
                    ? `Scheduled for: ${format(taskSchedule, 'PPP pp')}`
                    : 'Schedule Task'
                  }
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={taskSchedule || new Date()}
                  mode="datetime"
                  display="default"
                  onChange={(event, date) => {
                    setShowDatePicker(false);
                    if (date) setTaskSchedule(date);
                  }}
                  minimumDate={new Date()}
                />
              )}
              <TouchableOpacity style={styles.fileButton} onPress={handleSelectedFiles}>
                <Text style={styles.fileButtonText}>Attach Files</Text>
              </TouchableOpacity>

              {selectedFiles.length > 0 && (
                <View style={styles.fileList}>
                  {selectedFiles.map((fileUri, index) => {
                    const fileName = decodeURIComponent(fileUri.split('/').pop() || '');
                    return (
                      <Text key={index} style={styles.fileName}>
                        {fileName}
                      </Text>
                    );
                  })}
                </View>
              )}

              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAddTask}
              >
                <Text style={styles.addButtonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </>
      ) : (
        <TaskLog logs={logs} isDarkMode={isDarkMode} />
      )}

      <Modal
        visible={!!selectedTask}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedTask(null)}
      >
        {selectedTask && (
          <TaskDetail
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onDelete={() => deleteTask(selectedTask.id)}
            onStatusChange={(status) => updateTaskStatus(selectedTask.id, status)}
            isDarkMode={isDarkMode}
          />
        )}
      </Modal>
    </View>
  );
};



const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;