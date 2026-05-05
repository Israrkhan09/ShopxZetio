import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { login } from '../../redux/adminSlice';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'shopxzetio123') {
      dispatch(login({ username, password }));
      navigate('/admin/dashboard');
    } else {
      setError('INVALID CREDENTIALS. ACCESS DENIED.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-50"></div>
      
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-8 relative z-10 shadow-[0_0_50px_rgba(0,255,255,0.05)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary text-primary mb-4 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            <Shield size={32} />
          </div>
          <h1 className="text-[45px] font-heading font-black text-white mb-2 tracking-widest">XZETIO</h1>
          <p className="text-[18px] text-muted-foreground font-bold uppercase tracking-widest">System Administration</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded mb-6 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold uppercase text-muted-foreground mb-2">OPERATOR ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary font-mono text-primary transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold uppercase text-muted-foreground mb-2">ACCESS CODE</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-primary font-mono text-primary transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-4 rounded font-bold uppercase tracking-widest hover:glow-cyan transition-all mt-4"
          >
            INITIALIZE UPLINK
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
