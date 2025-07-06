import { useContext, useEffect, useState } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import TaskForm from './TackForm';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/fontawesome-svg-core";
import { FaEdit, FaTrash, FaCheckCircle, FaTimesCircle  } from 'react-icons/fa';


const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await API.delete(`/tasks/${id}`);
    fetchTasks();
    setIsLoading(false);
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0f172a]">

       

       <div className="relative z-10 flex w-95 flex-col rounded-[10px_50px] border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md">
       <div className=' flex justify-between align-middle'>
           <h3 className="mb-6 text-center text-3xl font-semibold text-white">TODO LIST</h3>
           <div>
               <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
           </div>
       </div>

          <div>
            <TaskForm fetchTasks={fetchTasks} editing={editing} setEditing={setEditing} />
          </div>
       
      
      
      <div className="max-h-80 visible-scrollbar w-full">
         {tasks.length === 0 ? (
    <div className="text-center py-30 text-gray-600">No Tasks Available</div>
  ) : (
      <ul>
        {tasks.map(t => (
          <li className="flex justify-between text-1xl capitalize  dark:bg-gray-800 px-1 py-1 my-1 rounded-lg " key={t._id}>
            {t.title} 
            <div >
            <button className='mx-2' disabled={isLoading} onClick={() => setEditing(t)}><FaEdit /></button>
            <button className={`mx-2 transition-colors duration-200 ${
             isLoading ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:text-red-400'
            }`}  disabled={isLoading} onClick={() => handleDelete(t._id)}> <FaTrash  /></button>
            </div>
            
          </li>
        ))}
      </ul>
  )}
       </div> 

      </div>
    </div>
  );
};

export default Dashboard;