'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </main>
  );
}
