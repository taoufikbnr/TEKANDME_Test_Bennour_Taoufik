// Type definitions for js-cookie
declare module 'js-cookie' {
  function get(name: string): string | undefined;
  function set(name: string, value: string | object, options?: CookieAttributes): void;
  function remove(name: string, options?: CookieAttributes): void;
  
  interface CookieAttributes {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
}

// Type definitions for the user context
interface UserContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  tasks: task[];
  setTasks: (tasks: task[] | ((prevTasks: task[]) => task[])) => void;
  token: string | null;
  userInfo: { username: string; email: string; id: string } | null;
  setToken: (token: string | null) => void;
  setUserInfo: (userInfo: { username: string; email: string; id: string } | null) => void;
}

// Task type definition - making all properties required
interface task {
  id: number;
  documentId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  userId: string;
  createdAt: string;
}

// TaskModal props
interface TaskModalProps {
  edit: boolean;
  task?: task;
  userId: string;
  onClose: () => void;
} 