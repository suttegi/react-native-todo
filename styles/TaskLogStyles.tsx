import { StyleSheet } from "react-native";

export const getTaskLogStyles = (isDarkMode: boolean) =>
    StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
    },
    header: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#333' : '#e0e0e0',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    logList: {
      padding: 15,
    },
    logEntry: {
      marginBottom: 20,
      padding: 15,
      borderRadius: 10,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5',
    },
    logHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    timestamp: {
      marginLeft: 8,
      color: isDarkMode ? '#888' : '#666',
      fontSize: 12,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 4,
    },
    details: {
      color: isDarkMode ? '#ddd' : '#333',
      fontSize: 14,
    },
    changeInfo: {
      marginTop: 8,
      padding: 8,
      backgroundColor: isDarkMode ? '#222' : '#e8e8e8',
      borderRadius: 6,
    },
    changeText: {
      color: isDarkMode ? '#bbb' : '#666',
      fontSize: 12,
    }
  });