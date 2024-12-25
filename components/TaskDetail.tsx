import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getTaskDetailStyles } from '../styles/TaskStyle';
import { X, Trash2, Clock, MapPin } from 'lucide-react-native';
import { TaskItem, TaskStatus } from '../App';

interface TaskDetailProps {
  task: TaskItem;
  onClose: () => void;
  onDelete: () => void;
  onStatusChange: (status: TaskStatus) => void;
  isDarkMode: boolean;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onClose,
  onDelete,
  onStatusChange,
  isDarkMode,
}) => {
  const styles = getTaskDetailStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Task Details</Text>
          <TouchableOpacity 
            onPress={onClose}
            style={styles.closeButton}
          >
            <X size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.detailsContainer}>
          <View style={styles.section}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{task.title}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{task.description || 'No description'}</Text>
          </View>

          {task.location && (
            <View style={styles.section}>
              <View style={styles.labelContainer}>
                <MapPin size={16} color={isDarkMode ? '#888' : '#666'} />
                <Text style={styles.label}>Location</Text>
              </View>
              <Text style={styles.value}>{task.location}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusButtons}>
              {(['In Progress', 'Completed', 'Cancelled'] as TaskStatus[]).map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusButton,
                    task.status === status && styles.activeStatusButton,
                  ]}
                  onPress={() => onStatusChange(status)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.statusButtonText,
                    task.status === status && styles.activeStatusButtonText,
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.timeSection}>
            <View style={styles.timeItem}>
              <View style={styles.labelContainer}>
                <Clock size={16} color={isDarkMode ? '#888' : '#666'} />
                <Text style={styles.label}>Created</Text>
              </View>
              <Text style={styles.value}>{task.createdAt}</Text>
            </View>

            {task.lastUpdated && (
              <View style={styles.timeItem}>
                <View style={styles.labelContainer}>
                  <Clock size={16} color={isDarkMode ? '#888' : '#666'} />
                  <Text style={styles.label}>Last Updated</Text>
                </View>
                <Text style={styles.value}>{task.lastUpdated}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={onDelete}
            activeOpacity={0.7}
          >
            <Trash2 size={20} color="#fff" />
            <Text style={styles.deleteButtonText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TaskDetail;