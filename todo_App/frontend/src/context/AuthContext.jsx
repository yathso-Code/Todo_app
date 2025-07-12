  import { createContext, useEffect, useState } from 'react';
import API from '../api';

  export const AuthContext = createContext();

  export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userRole , setUserRole] = useState(localStorage.getItem('role'))
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const [stats, setStats] = useState(null);

    const fetchStatus = async () => {
        const res = await API.get('/admin/stats');
        setStats(res.data);
      };

    const login = ({ token, userRole }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole); 
      setToken(token);
      setUserRole(userRole);
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      setToken(null);
      setUserRole(null);
    };

    useEffect(() => { fetchStatus(); }, [token]);

    return (
      <AuthContext.Provider value={{ token, userRole, login, logout, setSidebarOpen, sidebarOpen, stats }}>
        {children}
      </AuthContext.Provider>
    );
  };