import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getTaskStyles } from '../styles/TaskStyle';
import { Trash2, MoreVertical } from 'lucide-react-native';
import { TaskItem, TaskStatus } from '../App';

interface TaskProps {
  task: TaskItem;
  onPress: () => void;
  onStatusChange: (status: TaskStatus) => void;
  onDelete: () => void;
  isDarkMode: boolean;
}

const getStatusColor = (status: TaskStatus, isDarkMode: boolean) => {
  switch (status) {
    case 'In Progress':
      return isDarkMode ? '#ffd700' : '#f4c430';
    case 'Completed':
      return isDarkMode ? '#90EE90' : '#4CAF50';
    case 'Cancelled':
      return isDarkMode ? '#ff6b6b' : '#ff4949';
  }
};

const Task: React.FC<TaskProps> = ({
  task,
  onPress,
  onDelete,
  isDarkMode,
}) => {
  const styles = getTaskStyles(isDarkMode);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{task.title}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(task.status, isDarkMode) }
            ]}>
              <Text style={styles.statusText}>{task.status}</Text>
            </View>
          </View>
          
          <View style={styles.metadata}>
            <Text style={styles.date}>📅 Created: {task.createdAt}</Text>
            {task.lastUpdated && (
              <Text style={styles.date}>🔄 Updated: {task.lastUpdated}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.actions}>
          <TouchableOpacity onPress={onPress}>
            <MoreVertical size={20} color={isDarkMode ? '#888' : '#666'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Trash2 size={20} color={isDarkMode ? '#ff6b6b' : '#ff4949'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Task;