import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const LoginGlass = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.token);
      toast("You are login ! ")
      navigate('/dashboard'); 
    } catch (err) {
      setError(err?.response?.data?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-[#0f172a]">
    
      <div className="absolute h-[530px] w-[430px]">
        <div className="absolute -top-12 -right-12 h-52 w-52 rounded-full bg-gradient-to-r from-green-400 via-blue-600 to-blue-700" />
        <div className="absolute -bottom-12 -left-12 h-52 w-52 rounded-full bg-gradient-to-r from-red-500 via-purple-600 to-purple-700" />
      </div>

      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-80 flex-col rounded-[10px_50px] border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-md"
      >
        <h3 className="mb-6 text-center text-3xl font-semibold text-white">
          Login Form
        </h3>

        <label htmlFor="email" className="mb-2 text-lg text-white">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email"
          required
          className="mb-4 h-10 rounded-md bg-white/10 px-3 text-white placeholder:text-white/80 transition hover:bg-white/15 focus:outline-none"
        />

        <label htmlFor="password" className="mb-2 text-lg text-white">
          Password
        </label>
        <div className="relative mb-8">
  <input
    name="password"
    id="password"
    type={showPassword ? 'text' : 'password'}
    value={form.password}
    onChange={handleChange}
    placeholder="Enter Password"
    required
    className="h-10 w-full rounded-md bg-white/10 px-3 pr-10 text-white placeholder:text-white/80 transition hover:bg-white/15 focus:outline-none"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-white/80 hover:text-white"
  >
    {showPassword ? 'Hide' : 'Show'}
  </button>
</div>

        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
           className={`mt-2 h-10 rounded-full flex items-center justify-center gap-2 px-4 font-bold transition ${
    isLoading
      ? 'bg-white/50 text-black/50 cursor-not-allowed'
      : 'bg-white text-black/80 hover:bg-white/90'
  }`}
        >
          
           {isLoading && <Spinner size={16} />}
           {isLoading ? 'Login Now...' : 'Login Now'}
        </button>

        <button 
        onClick={() => navigate('/register')}
        className="mt-2 h-10 rounded-full text-blue-400 transition hover:text-blue-300 cursor-pointer text-1">
           Sign Up
         </button>
        
      </form>
    </div>
  );
};

export default LoginGlass;
