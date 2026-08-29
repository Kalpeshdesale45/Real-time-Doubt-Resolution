
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import LandingPage from '@/components/LandingPage';
import Dashboard from './Dashboard';

const Index = () => {
  const { user, profile, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show auth form if user clicked get started
  if (showAuth && !user) {
    return <LoginForm onBack={() => setShowAuth(false)} />;
  }

  // Show landing page if no user
  if (!user) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  // Show dashboard if user is logged in and has profile
  if (user && profile) {
    return <Dashboard />;
  }

  // Show loading if user exists but profile is still loading
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your profile...</p>
      </div>
    </div>
  );
};

export default Index;
