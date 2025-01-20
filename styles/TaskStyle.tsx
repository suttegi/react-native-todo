import { StyleSheet } from "react-native";

export const getTaskStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    item: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'flex-start',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    content: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#fff' : '#1a1a1a',
      flex: 1,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginLeft: 8,
    },
    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '500',
    },
    metadata: {
      gap: 4,
    },
    date: {
      fontSize: 12,
      color: isDarkMode ? '#888' : '#666',
    },
    actions: {
      flexDirection: 'row',
      gap: 12,
    },
    deleteButton: {
      padding: 4,
    },
});



export const getTaskDetailStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#3d3d3d' : '#eee',
    },
    closeButton: {
      padding: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    detailsContainer: {
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    label: {
      fontSize: 14,
      color: isDarkMode ? '#888' : '#666',
      fontWeight: '500',
    },
    value: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      lineHeight: 24,
    },
    timeSection: {
      gap: 16,
    },
    timeItem: {
      gap: 4,
    },
    statusButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    statusButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f0f0f0',
    },
    
    activeStatusButton: {
      backgroundColor: isDarkMode ? '#81b0ff' : '#55BCF6',
    },
    statusButtonText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
      fontWeight: '500',
    },
    activeStatusButtonText: {
      color: '#fff',
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#3d3d3d' : '#eee',
      paddingTop: 20,
    },
    deleteButton: {
      backgroundColor: isDarkMode ? '#ff6b6b' : '#ff4949',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 12,
      gap: 8,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    filesContainer: {
      marginTop: 10,
    },
    fileLink: {
      color: '#007BFF',
      textDecorationLine: 'underline',
      marginBottom: 5
    },
    map: {
      width: '100%',
      height: 250,
      borderRadius: 10,
      marginVertical: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
    },
  });