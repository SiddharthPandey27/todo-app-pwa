import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from '../components/TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    status: 'incomplete' as const,
    dueDate: new Date(),
    createdAt: new Date(),
    transfers: [],
  };

  it('renders task title correctly', () => {
    render(
      <TaskItem
        task={mockTask}
        onStatusChange={() => {}}
        onTransfer={() => {}}
      />
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onStatusChange with correct parameters when completing task', () => {
    const onStatusChange = vi.fn();
    render(
      <TaskItem
        task={mockTask}
        onStatusChange={onStatusChange}
        onTransfer={() => {}}
      />
    );

    const checkbox = screen.getByRole('button');
    fireEvent.click(checkbox);

    expect(onStatusChange).toHaveBeenCalledWith('complete', expect.any(Date));
  });

  it('shows transfer history when task has been transferred', () => {
    const taskWithTransfers = {
      ...mockTask,
      transfers: [
        {
          fromDate: new Date('2024-01-01'),
          toDate: new Date('2024-01-02'),
          reason: 'Need more time',
        },
      ],
    };

    render(
      <TaskItem
        task={taskWithTransfers}
        onStatusChange={() => {}}
        onTransfer={() => {}}
      />
    );

    const infoButton = screen.getByRole('button', { name: /info/i });
    fireEvent.click(infoButton);

    expect(screen.getByText(/Need more time/)).toBeInTheDocument();
  });
});