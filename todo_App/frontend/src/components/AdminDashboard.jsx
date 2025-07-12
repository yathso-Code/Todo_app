import React, { useContext } from 'react';
import { FiMenu, } from 'react-icons/fi';
import AdminNavbar from './admin_componemts/AdminNavbar';
import Count from './admin_componemts/Count';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = ({ children }) => {
  const { sidebarOpen, setSidebarOpen, stats } = useContext(AuthContext);

  return (
    <div>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white w-full">
        <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 

        <div className="bg-gray-700 w-screen  ">
         
           <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
            <button className="text-3xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu />
            </button>
            </header>

            <main className="p-4 ">
                  <div className="bg-white  dark:bg-gray-800 p-6 rounded-lg shadow-md">
                      <h2 className="text-xl font-bold">Welcome, Admin</h2>
                      <p className="text-gray-600 dark:text-gray-300">Manage users, tasks and more.</p>
                </div>
             </main>
            
             {
               !stats ? <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white">
                     <p className="text-xl">Loading admin stats...</p>
                </div>  :<Count 
                           totalUser={stats.totalUsers} 
                           totalTask={stats.totalTasks || 0} 
                           totalBlockedUser={stats.totalBlockedUsers || 0} 
                           totalNewUser={stats.newUsersToday || 0} 
                        />
             }

             

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;