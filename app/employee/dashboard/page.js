'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmployeeDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/users');
      const users = await response.json();
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const user = users.find(
        (u) => u.email === storedUser?.email && u.role === 'employee'
      );
      
      if (!user) {
        router.push('/');
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return null; // Optionally, you can display a loading spinner here

  return <div>Welcome to the Employee Dashboard!</div>;
}
