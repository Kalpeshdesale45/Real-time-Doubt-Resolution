import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { Calendar, MessageSquare, Users, Video, BookOpen, Target, TrendingUp, Activity } from 'lucide-react';

const GroupLeaderDashboard = () => {
  const { stats } = useStats();
  const { contacts } = useChat();
  const groupStats = [
    { label: 'Group Members', value: 6, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Active Meetings', value: 2, icon: Video, color: 'bg-green-100 text-green-600' },
    { label: 'Unread Messages', value: 8, icon: MessageSquare, color: 'bg-purple-100 text-purple-600' },
    { label: 'Projects', value: 3, icon: Target, color: 'bg-orange-100 text-orange-600' },
  ];

  const groupMembers = [
    { id: 1, name: 'Alice Johnson', role: 'Student', status: 'active', lastSeen: '2 min ago' },
    { id: 2, name: 'Bob Smith', role: 'Student', status: 'active', lastSeen: '5 min ago' },
    { id: 3, name: 'Carol Davis', role: 'Student', status: 'away', lastSeen: '1 hour ago' },
    { id: 4, name: 'David Wilson', role: 'Student', status: 'offline', lastSeen: '2 days ago' },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Weekly Group Sync',
      type: 'Group Meeting',
      time: 'Today 3:00 PM',
      participants: 6,
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Alumni Mentorship Session',
      type: 'Alumni Meeting',
      time: 'Tomorrow 10:00 AM',
      participants: 3,
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Group Leader Dashboard</h1>
        <p className="text-gray-600">Manage your group and coordinate activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groupStats.map((stat, index) => (
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
              Group Members
            </CardTitle>
            <CardDescription>Manage your team members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {groupMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    member.status === 'active' ? 'bg-green-500' : 
                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className="text-xs text-gray-500">Last seen {member.lastSeen}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Message</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Meetings
            </CardTitle>
            <CardDescription>Your scheduled group sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-gray-600">{meeting.type}</p>
                  <p className="text-sm text-gray-500">{meeting.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary">{meeting.participants} members</Badge>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Schedule New Meeting
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analytics and Communication */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Group Analytics
            </CardTitle>
            <CardDescription>Performance metrics for your group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Group Engagement</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Conversations</span>
                <span className="font-semibold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Meetings This Week</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Project Progress</span>
                <span className="font-semibold text-blue-600">78%</span>
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
            <CardDescription>Manage your group efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Group Chat
            </Button>
            <Button className="w-full" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Members
            </Button>
            <Button className="w-full" variant="outline">
              <Target className="mr-2 h-4 w-4" />
              Track Projects
            </Button>
            <Button className="w-full" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupLeaderDashboard;