
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6 page-transition">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Digital Will</h1>
            <p className="text-muted-foreground">
              Secure your digital legacy for future generations
            </p>
          </div>
          <LoginForm />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials: user@example.com / password</p>
          </div>
        </div>
      </div>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Digital Will. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
