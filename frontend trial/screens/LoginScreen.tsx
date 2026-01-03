
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { MOCK_USERS } from '../constants';
import { Role } from '../types';

const LoginScreen: React.FC = () => {
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('user');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate finding user in mock data
    const foundUser = MOCK_USERS.find(u => u.role === role);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Invalid credentials for this role demo");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-900 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-800 rounded-full opacity-50 blur-3xl"></div>
        <div className="z-10 text-center p-12">
          <h2 className="text-white text-5xl font-serif font-bold mb-6 leading-tight">Your Dream Event Starts Here</h2>
          <p className="text-indigo-100 text-lg max-w-md mx-auto">Access thousands of premium banquet halls at your fingertips. Simple booking, memorable events.</p>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 font-serif">SimpleWords</h1>
            <p className="text-gray-500 mt-2">{isSignup ? 'Create your account' : 'Welcome back, please login'}</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            {(['user', 'owner', 'admin'] as Role[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${role === r ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {r}
              </button>
            ))}
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-indigo-200"
            >
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-500">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="ml-2 text-indigo-600 font-bold hover:underline"
            >
              {isSignup ? 'Log In' : 'Sign Up Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
