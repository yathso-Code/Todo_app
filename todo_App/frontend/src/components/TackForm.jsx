import { useState, useEffect } from 'react';
import API from '../api';
import Spinner from './Spinner';

const TaskForm = ({ fetchTasks, editing, setEditing }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editing) setTitle(editing.title);
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    setIsLoading(true);
    if (editing) {
      await API.put(`/tasks/${editing._id}`, { title });
      setEditing(null);
    } else {
      await API.post('/tasks', { title });
    }
    setIsLoading(false);
    setTitle('');
    fetchTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} placeholder="Task title" 
      onChange={e => {
        setTitle(e.target.value);
        setError('');
      }
    }
      className="mb-4 h-10 rounded-md bg-white/10 px-3 text-white placeholder:text-white/80 transition hover:bg-white/15 focus:outline-none w-full" />

       {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

      <button type="submit"
      disabled={isLoading}
       className={`text-gray-900 border font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full flex items-center justify-center gap-2
    ${isLoading
      ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-white'
      : 'bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600'
    }`}
    >
        {isLoading && <Spinner size={16} color="text-black dark:text-white" />}
        {isLoading ? (editing ? 'Updating...' : 'Adding...') : (editing ? 'Update' : 'Add Task')}
       </button>
    </form>
  );
};

export default TaskForm;