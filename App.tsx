import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
  Switch,
  Modal,
} from 'react-native';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Task from './components/Task';
import TaskDetail from './components/TaskDetail';
import { getStyles } from './styles/AppStyle';
import { format } from 'date-fns';
import { SortAsc, SortDesc } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TASKS_KEY = '@tasks';
const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_LOCATION_LENGTH = 30;


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

export type TaskStatus = 'In Progress' | 'Completed' | 'Cancelled';

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  location?: string;
  createdAt: string;
  status: TaskStatus;
  lastUpdated?: string;
}

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
  

  const handleAddTask = (): void => {

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
    }
  
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      location: taskLocation.trim() || undefined,
      createdAt: format(new Date(), 'PPP pp'),
      status: 'In Progress',
    };
  
    setTaskItems([...taskItems, newTask]);
    setTaskTitle('');
    setTaskDescription('');
    setTaskLocation('');
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus): void => {
    setTaskItems(taskItems.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: newStatus,
          lastUpdated: format(new Date(), 'PPP pp'),
        };
      }
      return task;
    }));
  };

  const deleteTask = (id: string): void => {
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

  return (
    <View style={styles.container}>
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
            <Text style={styles.themeSwitchText}>🌙</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={styles.themeSwitchText}>☀️</Text>
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
          <TextInput
            style={styles.input}
            placeholder="Location (optional)"
            placeholderTextColor={isDarkMode ? '#888' : '#666'}
            value={taskLocation}
            onChangeText={setTaskLocation}
          />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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