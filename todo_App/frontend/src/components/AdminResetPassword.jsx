import React, { useContext, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';
import AdminNavbar from './admin_componemts/AdminNavbar';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { isStrongPassword } from '../utils/helper';
import Spinner from './Spinner';

const AdminResetPassword = () => {
  const { sidebarOpen, setSidebarOpen } = useContext(AuthContext);
  const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!isStrongPassword(form.newPassword)) {
    setError("Weak password! Use 8+ chars with A-Z, a-z, 0-9 & symbol.");
    return;
      }

    setLoading(true);
    setError('');
    try {
      const res = await API.put('/admin/reset-password', form);
      toast.success(res.data.message || 'Password updated successfully');
      setForm({ oldPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
      toast.error(err.response?.data?.message || 'Password update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white w-full">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="bg-gray-700 w-screen">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow sticky top-0 z-30">
          <button className="text-3xl" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
        </header>

        <main className="p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block mb-1">Old Password</label>
                 <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="oldPassword"
      id="oldPassword"
      className="w-full px-4 py-2 pr-10 rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
      value={form.oldPassword}
      onChange={handleChange}
      placeholder="Enter old password"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 px-3 text-sm text-gray-500 dark:text-gray-300"
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block mb-1">New Password</label>
                 <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      name="newPassword"
      id="newPassword"
      className="w-full px-4 py-2 pr-10 rounded bg-gray-100 dark:bg-gray-700 focus:outline-none"
      value={form.newPassword}
      onChange={handleChange}
      placeholder="Enter new password"
      required
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 px-3 text-sm text-gray-500 dark:text-gray-300"
    >
      {showPassword ? 'Hide' : 'Show'}
    </button>
  </div>
              </div>

              {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                className={`mt-2 h-10 w-full rounded-full flex items-center justify-center gap-2 px-4 font-bold transition ${
                        loading
                        ? 'bg-white/50 text-black/50 cursor-not-allowed'
                        : 'bg-white text-black/80 hover:bg-white/90'
                 }`}
                disabled={loading}
              >
                 {loading && <Spinner size={16} />}
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminResetPassword;
