'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EmployeeRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'employee' }),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Employee Registration</h2>
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
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
