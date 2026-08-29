
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  GraduationCap,
  Shield,
  BookOpen
} from 'lucide-react';

const HODDashboard = () => {
  const { stats, loading } = useStats();
  const { contacts } = useChat();

  const roleStats = [
    { label: 'Students', value: stats.totalStudents, icon: GraduationCap, color: 'bg-blue-100 text-blue-600' },
    { label: 'Local Guardians', value: stats.totalLocalGuardians, icon: Shield, color: 'bg-green-100 text-green-600' },
    { label: 'Group Leaders', value: stats.totalGroupLeaders, icon: UserCheck, color: 'bg-purple-100 text-purple-600' },
    { label: 'Alumni', value: stats.totalAlumni, icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  ];

  const systemStats = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Groups', value: stats.totalGroups, icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Active Meetings', value: stats.activeMeetings, icon: Video, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Mentors', value: stats.totalMentors, icon: UserCheck, color: 'bg-red-100 text-red-600' },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New mentor assigned',
      user: 'Dr. Sarah Wilson',
      target: 'Group A-5',
      time: '10 minutes ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'Meeting completed',
      user: 'Alumni John Smith',
      target: 'Student Group B-3',
      time: '1 hour ago',
      status: 'success'
    },
    {
      id: 3,
      action: 'User approval pending',
      user: 'New Student Registration',
      target: 'Emily Johnson',
      time: '2 hours ago',
      status: 'pending'
    }
  ];

  const pendingApprovals = [
    { id: 1, name: 'Michael Chen', role: 'Mentor', department: 'Computer Science', submitted: '2 days ago' },
    { id: 2, name: 'Lisa Rodriguez', role: 'Local Guardian', department: 'Engineering', submitted: '1 day ago' },
    { id: 3, name: 'David Kumar', role: 'Group Leader', department: 'Business', submitted: '3 hours ago' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">HOD Dashboard</h1>
        <p className="text-gray-600">System overview and management center</p>
      </div>

      {/* Role-based User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{loading ? '...' : stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{loading ? '...' : stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest actions and events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user} → {activity.target}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'success' ? 'secondary' : 'outline'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Pending Approvals
            </CardTitle>
            <CardDescription>User registrations awaiting approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.role} - {user.department}</p>
                  <p className="text-xs text-gray-500">Submitted {user.submitted}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Communication Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="font-semibold">{Math.floor(stats.totalUsers * 0.76)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Conversations</span>
                <span className="font-semibold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Completed Meetings</span>
                <span className="font-semibold">{stats.completedMeetings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Student Engagement</span>
                <span className="font-semibold text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Open Chat Center
            </Button>
            <Button className="w-full" variant="outline">
              <Activity className="mr-2 h-4 w-4" />
              View Activity Logs
            </Button>
            <Button className="w-full" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Server Status</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Chat Service</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Video Service</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HODDashboard;
