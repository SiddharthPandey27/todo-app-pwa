import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'transfers'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus, completedAt?: Date) => void;
  transferTask: (id: string, toDate: Date, reason?: string) => void;
  updateTaskDetails: (id: string, details: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          transfers: [],
        },
      ],
    })),
  updateTaskStatus: (id, status, completedAt) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status, completedAt: status === 'complete' ? completedAt : undefined }
          : task
      ),
    })),
  transferTask: (id, toDate, reason) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              dueDate: toDate,
              transfers: [
                ...task.transfers,
                {
                  fromDate: task.dueDate,
                  toDate,
                  reason,
                },
              ],
            }
          : task
      ),
    })),
  updateTaskDetails: (id, details) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, additionalDetails: details } : task
      ),
    })),
}));