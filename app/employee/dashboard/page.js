'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmployeeDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser || storedUser.role !== 'employee') {
          router.push('/');
          return;
        }

        setUser(storedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/');
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (user === null) {
    return <div>Loading...</div>; // Display loading state while fetching user
  }

  return (
    <div className="p-4 bg-white mt-4 flex flex-col justify-center items-center">
      <div className="rounded-xl shadow-md p-5 border-t-8 border-t-blue-500">
        <h2 className="text-2xl mb-4">Welcome to the Employee's Dashboard!</h2>
        <Button
          variant="destructive"  // Ensure this variant is correctly defined in your Button component
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
