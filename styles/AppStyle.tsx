import { StyleSheet } from 'react-native';

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    titleContainer: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#1a1a1a',
    },
    taskCount: {
      fontSize: 16,
      color: isDarkMode ? '#888' : '#666',
      marginTop: 4,
    },
    themeSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
    },
    themeSwitchText: {
      fontSize: 16,
      marginHorizontal: 8,
    },
    filterContainer: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    filterButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
    },
    activeFilter: {
      backgroundColor: isDarkMode ? '#81b0ff' : '#55BCF6',
    },
    filterText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    sortButton: {
      paddingVertical: 4,
    },
    sortText: {
      color: isDarkMode ? '#888' : '#666',
      fontSize: 14,
    },
    activeSortText: {
      color: isDarkMode ? '#81b0ff' : '#55BCF6',
      fontWeight: '600',
    },
    tasksWrapper: {
      paddingHorizontal: 20,
      flex: 1,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 20,
      fontWeight: '600',
      color: isDarkMode ? '#888' : '#666',
    },
    emptyStateSubtext: {
      fontSize: 16,
      color: isDarkMode ? '#666' : '#999',
      marginTop: 8,
    },
    items: {
      marginTop: 20,
    },
    writeTaskWrapper: {
      padding: 20,
      width: '100%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 20
    },
    input: {
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f8f8f8',
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      color: isDarkMode ? '#fff' : '#000',
    },
    titleInput: {
      fontSize: 16,
      fontWeight: '500',
    },
    addButton: {
      backgroundColor: isDarkMode ? '#81b0ff' : '#55BCF6',
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });