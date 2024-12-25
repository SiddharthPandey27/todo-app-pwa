import React from 'react';
import { Info, Calendar, CheckCircle, Circle, Clock } from 'lucide-react';
import { Task } from '../types/task';
import { cn, formatDate, formatTime } from '../lib/utils';

interface TaskItemProps {
  task: Task;
  onStatusChange: (status: Task['status'], completedTime?: Date) => void;
  onTransfer: (date: Date) => void;
}

export function TaskItem({ task, onStatusChange, onTransfer }: TaskItemProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const handleStatusChange = () => {
    if (task.status !== 'complete') {
      const now = new Date();
      onStatusChange('complete', now);
    } else {
      onStatusChange('incomplete');
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleStatusChange}
            className="text-blue-500 hover:text-blue-600"
          >
            {task.status === 'complete' ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </button>
          <span
            className={cn(
              'text-lg',
              task.status === 'complete' && 'line-through text-gray-500'
            )}
          >
            {task.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-500 hover:text-gray-700"
          >
            <Info className="h-5 w-5" />
          </button>
          {task.transfers.length > 0 && (
            <Calendar className="h-5 w-5 text-amber-500" />
          )}
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 text-sm text-gray-600 space-y-2">
          {task.description && <p>{task.description}</p>}
          <div className="space-y-1">
            <p>Created: {formatDate(task.createdAt)}</p>
            {task.completedAt && (
              <p>
                Completed: {formatDate(task.completedAt)} at{' '}
                {formatTime(task.completedAt)}
              </p>
            )}
            {task.transfers.length > 0 && (
              <div>
                <p className="font-medium">Transfer History:</p>
                <ul className="ml-4 space-y-1">
                  {task.transfers.map((transfer, index) => (
                    <li key={index}>
                      From {formatDate(transfer.fromDate)} to{' '}
                      {formatDate(transfer.toDate)}
                      {transfer.reason && ` - ${transfer.reason}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}