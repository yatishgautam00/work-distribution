'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, role) => {
  return (props) => {
    const router = useRouter();
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
      if (!user || user.role !== role) {
        router.push('/');
      }
    }, [user, role, router]);

    return user && user.role === role ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
