import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminUserList from './components/AdminUserList';
import AdminResetPassword from './components/AdminResetPassword';

function App() {
  const { token, userRole } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token
                   ? <Navigate to={userRole === "admin" ? "/admin/dashboard" : "/dashboard"} />
                   : <Navigate to="/login" />
            }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={ token
                    ? (userRole === "admin"
                    ? <Navigate to="/admin/dashboard" />
                    : <Dashboard />)
              : <Navigate to="/login" />
             }
        />

        <Route path="/admin/dashboard" element={token && userRole === "admin" ? <AdminDashboard /> : <Navigate to="/dashboard" /> }/>
        <Route path="/admin/users" element={ token && userRole === "admin" ? <AdminUserList /> : <Navigate to="/dashboard" /> }/>
        <Route path="/admin/reset-password" element={ token && userRole === "admin" ? <AdminResetPassword /> : <Navigate to="/dashboard" /> }/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;