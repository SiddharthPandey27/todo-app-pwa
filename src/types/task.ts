export type TaskStatus = 'complete' | 'incomplete' | 'pending';

export interface TaskTransfer {
  fromDate: Date;
  toDate: Date;
  reason?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
  transfers: TaskTransfer[];
  additionalDetails?: string;
}