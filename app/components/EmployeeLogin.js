'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch('/api/users');
    const users = await response.json();

    const user = users.find(
      (user) => user.email === email && user.password === password && user.role === 'employee'
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/employee/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Employee Login</h2>
      <input
        className="mb-2 p-2 border rounded"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="mb-2 p-2 border rounded"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2" onClick={handleLogin}>
        Login
      </button>
      <button className="text-blue-500" onClick={() => router.push('/employee/register')}>
        Sign Up
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
