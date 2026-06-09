import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { filterTasks } from './utils/filterTasks';
import UserProfile from './components/UserProfile';
import TaskFilter from './components/TaskFilter';
import TaskItem from './components/TaskItem';

export default function StudentWork() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading tasks...</p>;

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div>
      <UserProfile name="Student" />
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
