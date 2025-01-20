import { StyleSheet } from 'react-native';

export const getStyles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    },
    header: {
      paddingTop: 20,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    titleContainer: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#1a1a1a',
    },
    taskCount: {
      fontSize: 14,
      color: isDarkMode ? '#888' : '#666',
      marginTop: 2,
    },
    themeSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 16,
    },
    themeSwitchText: {
      fontSize: 14,
      marginHorizontal: 6,
    },
    filterContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    filterButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 10,
    },
    filterButton: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
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
      gap: 12,
    },
    sortButton: {
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    sortText: {
      color: isDarkMode ? '#888' : '#666',
      fontSize: 14,
    },
    activeSortText: {
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: '600',
    },
    writeTaskWrapper: {
      padding: 12,
      width: '100%',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 5,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 12,
      gap: 8,
    },
    inputGroup: {
      gap: 8,
    },
    input: {
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f8f8f8',
      borderRadius: 10,
      padding: 10,
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
    },
    titleInput: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 0,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 0,
    },
    locationInput: {
      flex: 1,
      marginBottom: 0,
    },
    locationButton: {
      padding: 10,
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f8f8f8',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
    },
    scheduleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 0,
    },
    scheduleButton: {
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f8f8f8',
      padding: 12,
      borderRadius: 10,
      marginTop: 8,
    },
    scheduleButtonText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
    },
    
    scheduledTime: {
      color: isDarkMode ? '#81b0ff' : '#55BCF6',
      fontSize: 12,
      marginTop: 2,
    },
    actionButton: {
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 6,
    },
    addButton: {
      backgroundColor: isDarkMode ? '#81b0ff' : '#55BCF6',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 8,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    fileButton: {
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f8f8f8',
      padding: 8,
      borderRadius: 10,
      marginTop: 0,
    },
    fileButtonText: {
      color: isDarkMode ? '#fff' : '#000',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    fileList: {
      marginTop: 4,
    },
    fileName: {
      fontSize: 12,
      color: isDarkMode ? '#888' : '#666',
      marginVertical: 1,
    },
    tasksWrapper: {
      paddingHorizontal: 16,
      flex: 1,
    },
    items: {
      marginTop: 16,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 32,
    },
    emptyStateText: {
      fontSize: 18,
      fontWeight: '600',
      color: isDarkMode ? '#888' : '#666',
    },
    emptyStateSubtext: {
      fontSize: 14,
      color: isDarkMode ? '#666' : '#999',
      marginTop: 6,
    },
    taskItem: {
      backgroundColor: isDarkMode ? '#2d2d2d' : '#fff',
      padding: 12,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    taskItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    taskItemDetails: {
      marginLeft: 10,
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: isDarkMode ? '#fff' : '#000',
    },
    taskDescription: {
      fontSize: 14,
      color: isDarkMode ? '#888' : '#666',
      marginTop: 2,
    },
    taskStatus: {
      fontSize: 12,
      marginTop: 4,
    },
    taskDate: {
      fontSize: 12,
      color: isDarkMode ? '#666' : '#999',
      marginTop: 2,
    },
    taskActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f0f0f0',
    },
    deleteButton: {
      padding: 6,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f0f0f0',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    modalCloseButton: {
      padding: 8,
    },
    modalBody: {
      marginBottom: 16,
    },
    modalLabel: {
      fontSize: 14,
      color: isDarkMode ? '#888' : '#666',
      marginBottom: 4,
    },
    modalText: {
      fontSize: 16,
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 12,
    },
    modalFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    deleteModalButton: {
      backgroundColor: '#ff4444',
    },
    cancelModalButton: {
      backgroundColor: isDarkMode ? '#3d3d3d' : '#f0f0f0',
    },
    statusModalButton: {
      backgroundColor: isDarkMode ? '#81b0ff' : '#55BCF6',
    },
    tabContainer: {
      paddingTop: 40 ,
      flexDirection: 'row',
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 8,
      overflow: 'hidden',
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: isDarkMode ? '#444' : '#fff',
    },
    tabText: {
      color: isDarkMode ? '#888' : '#666',
      fontSize: 16,
    },
    activeTabText: {
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
  });