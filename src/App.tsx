import React from 'react';
import { Calendar } from './components/Calendar';
import { TaskItem } from './components/TaskItem';
import { useTaskStore } from './store/useTaskStore';
import { Plus } from 'lucide-react';
import { Task } from './types/task';

export default function App() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const { tasks, addTask, updateTaskStatus, transferTask } = useTaskStore();

  const filteredTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate).toDateString() === selectedDate.toDateString()
  );

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle,
        status: 'incomplete',
        dueDate: selectedDate,
        description: '',
      });
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Task Calendar
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Calendar
              tasks={tasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          <div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Tasks for {selectedDate.toLocaleDateString()}
                </h2>
                <button
                  onClick={() => setShowAddTask(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Plus className="h-6 w-6" />
                </button>
              </div>

              {showAddTask && (
                <form onSubmit={handleAddTask} className="mb-4">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </form>
              )}

              <div className="space-y-4">
                {filteredTasks.map((task: Task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onStatusChange={(status, completedTime) =>
                      updateTaskStatus(task.id, status, completedTime)
                    }
                    onTransfer={(date) => transferTask(task.id, date)}
                  />
                ))}
                {filteredTasks.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No tasks for this day
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}