
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import StudentDashboard from '@/components/Dashboard/StudentDashboard';
import HODDashboard from '@/components/Dashboard/HODDashboard';
import GroupLeaderDashboard from '@/components/Dashboard/GroupLeaderDashboard';
import MentorDashboard from '@/components/Dashboard/MentorDashboard';
import LocalGuardianDashboard from '@/components/Dashboard/LocalGuardianDashboard';
import AlumniDashboard from '@/components/Dashboard/AlumniDashboard';
import ChatInterface from '@/components/Chat/ChatInterface';
import MeetingScheduler from '@/components/Meetings/MeetingScheduler';

const Dashboard = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600">Please contact your administrator to set up your profile.</p>
        </div>
      </div>
    );
  }

  // Check if user needs approval for certain roles
  if (!profile.approved && ['mentor', 'local_guardian', 'hod'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Account Pending Approval</h2>
            <p className="text-yellow-700">
              Your {profile.role.replace('_', ' ')} account is pending approval from the administration. 
              You will be notified once your account is activated.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        switch (profile.role) {
          case 'hod':
            return <HODDashboard />;
          case 'group_leader':
            return <GroupLeaderDashboard />;
          case 'mentor':
            return <MentorDashboard />;
          case 'local_guardian':
            return <LocalGuardianDashboard />;
          case 'alumni':
            return <AlumniDashboard />;
          case 'student':
          default:
            return <StudentDashboard />;
        }
      case 'chat':
        return <ChatInterface />;
      case 'meetings':
        return <MeetingScheduler />;
      default:
        return <div className="p-6">Feature coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
