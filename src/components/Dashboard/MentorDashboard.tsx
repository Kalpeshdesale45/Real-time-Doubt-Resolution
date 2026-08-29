import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { Calendar, MessageSquare, Users, Video, BookOpen, GraduationCap, TrendingUp, Activity, Clock } from 'lucide-react';

const MentorDashboard = () => {
  const { stats } = useStats();
  const { contacts } = useChat();
  const mentorStats = [
    { label: 'Mentee Groups', value: 4, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Sessions This Week', value: 12, icon: Video, color: 'bg-green-100 text-green-600' },
    { label: 'Active Students', value: 24, icon: GraduationCap, color: 'bg-purple-100 text-purple-600' },
    { label: 'Resources Shared', value: 18, icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  ];

  const menteeGroups = [
    { id: 1, name: 'Group A-5', leader: 'Sarah Johnson', members: 6, lastActivity: '2 hours ago' },
    { id: 2, name: 'Group B-3', leader: 'Mike Chen', members: 5, lastActivity: '1 day ago' },
    { id: 3, name: 'Group C-7', leader: 'Lisa Rodriguez', members: 7, lastActivity: '3 hours ago' },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: 'Career Guidance Session',
      group: 'Group A-5',
      time: 'Today 2:00 PM',
      type: 'Group Mentoring',
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Project Review',
      group: 'Group B-3',
      time: 'Tomorrow 10:00 AM',
      type: 'Technical Review',
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
        <p className="text-gray-600">Guide and support your mentee groups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mentorStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
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
              <Users className="h-5 w-5" />
              Mentee Groups
            </CardTitle>
            <CardDescription>Groups under your mentorship</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {menteeGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{group.name}</h4>
                  <p className="text-sm text-gray-600">Led by {group.leader}</p>
                  <p className="text-sm text-gray-500">{group.members} members • Last activity {group.lastActivity}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Message</Button>
                  <Button size="sm">Schedule</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your scheduled mentoring sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-gray-600">with {session.group}</p>
                  <p className="text-sm text-gray-500">{session.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary">{session.type}</Badge>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analytics and Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Mentorship Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Success Rate</span>
                <span className="font-semibold text-green-600">96%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Mentees</span>
                <span className="font-semibold">18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Sessions</span>
                <span className="font-semibold">{stats.completedMeetings}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Response Time</span>
                <span className="font-semibold text-blue-600">2.4h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Open Chat Center
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Groups
            </Button>
            <Button className="w-full" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Resource Library
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Chat Service</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Meeting Service</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Connections</span>
              <span className="font-semibold">{contacts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Students</span>
              <span className="font-semibold">{stats.totalStudents}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentorDashboard;