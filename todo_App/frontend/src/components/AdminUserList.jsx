import React, { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import AdminNavbar from './admin_componemts/AdminNavbar';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { useSearchParams } from 'react-router-dom';

const AdminUserList = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(search); 

  const fetchUsers = async () => {
    try {
      const res = await API.get(`/admin/users?page=${page}&search=${search}`);
      setUsers(res.data.users);
      setPages(res.data.pages);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = {};
      if (searchInput) params.search = searchInput;
      if (page > 1) params.page = page;
      setSearchParams(params);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);


  const handleBlockToggle = async (userId, isBlocked) => {
    setLoading(true);
    try {
      await API.put(`/admin/block/${userId}`, { block: !isBlocked });
      fetchUsers();
    } catch (err) {
      console.error('Failed to update block status');
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    const params = {};
    if (searchInput) params.search = searchInput;
    if (newPage > 1) params.page = newPage;
    setSearchParams(params);
  };

   

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white w-full">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="bg-gray-700 w-screen">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
          <button className="text-3xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </header>

        {
          !users  ? <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-white">
                     <p className="text-xl">Loading...</p>
                </div> : <main className="p-4 overflow-x-auto">
          <table className="min-w-full text-sm bg-white dark:bg-gray-800 rounded shadow">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Total Tasks</th>
                <th className="px-4 py-2 text-center">Status</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              { users.map((user) => (
                <tr key={user._id} className="border-t border-gray-300 dark:border-gray-700">
                  <td className="px-4 py-2 capitalize">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 text-center">{user.tasks?.length || 0}</td>
                  <td className="px-4 py-2 text-center">
                    {user.isBlocked ? (
                      <span className="text-red-500">Blocked</span>
                    ) : (
                      <span className="text-green-500">Active</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      disabled={ user.role === "admin" ? true : loading}
                      className={`px-3 py-1 rounded text-white text-xs ${
                        user.isBlocked ? 'bg-green-500' : 'bg-red-500'
                      }${ user.role === "admin" ? 'opacity-50 cursor-not-allowed bg-gray-600' : loading ? 'opacity-50 cursor-not-allowed bg-gray-600' : ''}`}
                      onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                    >
                      {loading
                           ? 'Processing...'
                           : user.isBlocked
                           ? 'Unblock'
                           : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>
        }

        
      </div>
    </div>
  );
};

export default AdminUserList;
