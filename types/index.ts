export type TaskStatus = 'In Progress' | 'Completed' | 'Cancelled';


export interface TaskItem {
    id: string;
    title: string;
    description: string;
    location?: string;
    coordinates?: {
      latitude: number,
      longitude: number,
    };
    createdAt: string;
    status: TaskStatus;
    lastUpdated?: string;
    files?: string[];
    scheduledFor?: string;
    notificationId?: string;
  }

export interface TaskProps {
    task: TaskItem;
    onPress: () => void;
    onStatusChange: (status: TaskStatus) => void;
    onDelete: () => void;
    isDarkMode: boolean;
  }

export interface TaskDetailProps {
    task: TaskItem;
    onClose: () => void;
    onDelete: () => void;
    onStatusChange: (status: TaskStatus) => void;
    isDarkMode: boolean;
  }

export interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }


export interface LogEntry {
    id: string;
    taskId: string;
    taskTitle: string;
    action: 'created' | 'updated' | 'deleted' | 'status_changed';
    timestamp: string;
    details: string;
    oldValue?: string;
    newValue?: string;
  }
  
export interface TaskLogProps {
    logs: LogEntry[];
    isDarkMode: boolean;
  }