
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  MessageSquare, 
  Video, 
  Users, 
  Calendar,
  BarChart3,
  UserCheck,
  Shield,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { profile } = useAuth();

  if (!profile) return null;

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'chat', label: 'Chat', icon: MessageSquare },
      { id: 'meetings', label: 'Meetings', icon: Video },
    ];

    switch (profile.role) {
      case 'student':
      case 'group_leader':
        return [
          ...baseItems,
          { id: 'group', label: 'My Group', icon: Users },
          { id: 'alumni', label: 'Alumni Connect', icon: BookOpen },
        ];
      
      case 'mentor':
        return [
          ...baseItems,
          { id: 'groups', label: 'My Groups', icon: Users },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
        ];
      
      case 'local_guardian':
        return [
          ...baseItems,
          { id: 'mentors', label: 'Manage Mentors', icon: UserCheck },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        ];
      
      case 'hod':
        return [
          ...baseItems,
          { id: 'users', label: 'User Management', icon: Shield },
          { id: 'logs', label: 'Activity Logs', icon: BarChart3 },
          { id: 'analytics', label: 'System Analytics', icon: BarChart3 },
        ];
      
      case 'alumni':
        return [
          ...baseItems,
          { id: 'students', label: 'Connect with Students', icon: Users },
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-50 border-r border-gray-200">
      <div className="flex-1 overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                activeTab === item.id && "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
              )}
              onClick={() => onTabChange(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
