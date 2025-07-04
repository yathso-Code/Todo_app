import { useState, useEffect } from 'react';
import API from '../api';

const TaskForm = ({ fetchTasks, editing, setEditing }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editing) setTitle(editing.title);
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/tasks/${editing._id}`, { title });
      setEditing(null);
    } else {
      await API.post('/tasks', { title });
    }
    setTitle('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} placeholder="Task title" onChange={e => setTitle(e.target.value)}
      className="mb-4 h-10 rounded-md bg-white/10 px-3 text-white placeholder:text-white/80 transition hover:bg-white/15 focus:outline-none w-full" />
      <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full">{editing ? 'Update' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;