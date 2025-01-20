import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Clock } from 'lucide-react-native';
import { format } from 'date-fns';
import { getTaskLogStyles } from '../styles/TaskLogStyles';
import { TaskLogProps, LogEntry } from '../types';



const TaskLog: React.FC<TaskLogProps> = ({ logs, isDarkMode }) => {

  const getActionColor = (action: LogEntry['action'], isDark: boolean): string => {
    switch (action) {
      case 'created':
        return isDark ? '#90EE90' : '#4CAF50';
      case 'deleted':
        return isDark ? '#ff6b6b' : '#ff4949';
      case 'updated':
        return isDark ? '#ffd700' : '#f4c430';
      case 'status_changed':
        return isDark ? '#81b0ff' : '#2196F3';
      default:
        return isDark ? '#fff' : '#000';
    }
  };
  const styles = getTaskLogStyles(isDarkMode);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity Log</Text>
      </View>
      <ScrollView style={styles.logList}>
        {logs.map((log) => (
          <View key={log.id} style={styles.logEntry}>
            <View style={styles.logHeader}>
              <Clock size={16} color={getActionColor(log.action, isDarkMode)} />
              <Text style={styles.timestamp}>{log.timestamp}</Text>
            </View>
            <Text style={styles.taskTitle}>{log.taskTitle}</Text>
            <Text style={styles.details}>{log.details}</Text>
            {(log.oldValue || log.newValue) && (
              <View style={styles.changeInfo}>
                {log.oldValue && (
                  <Text style={styles.changeText}>From: {log.oldValue}</Text>
                )}
                {log.newValue && (
                  <Text style={styles.changeText}>To: {log.newValue}</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TaskLog;