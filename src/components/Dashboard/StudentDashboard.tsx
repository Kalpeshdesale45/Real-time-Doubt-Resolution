
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { Calendar, MessageSquare, Users, Video, BookOpen, TrendingUp, Clock } from 'lucide-react';

const StudentDashboard = () => {
  const { stats } = useStats();
  const { contacts } = useChat();
  const upcomingMeetings = [
    {
      id: 1,
      title: 'Career Guidance Session',
      with: 'Alumni - John Smith',
      time: '2:00 PM Today',
      type: 'Group Session'
    },
    {
      id: 2,
      title: 'Project Discussion',
      with: 'Mentor - Dr. Wilson',
      time: 'Tomorrow 10:00 AM',
      type: 'Mentor Meeting'
    }
  ];

  const recentChats = [
    {
      id: 1,
      name: 'Study Group',
      lastMessage: 'Don\'t forget about tomorrow\'s presentation',
      time: '5 min ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Sarah Johnson (Alumni)',
      lastMessage: 'I\'d be happy to help with your resume',
      time: '1 hour ago',
      unread: 0
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">5</p>
                <p className="text-sm text-gray-600">Group Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">3</p>
                <p className="text-sm text-gray-600">Upcoming Meetings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">12</p>
                <p className="text-sm text-gray-600">Unread Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold">8</p>
                <p className="text-sm text-gray-600">Alumni Connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Meetings
            </CardTitle>
            <CardDescription>Your scheduled sessions this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{meeting.title}</h4>
                  <p className="text-sm text-gray-600">{meeting.with}</p>
                  <p className="text-sm text-gray-500">{meeting.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="secondary">{meeting.type}</Badge>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Recent Chats
            </CardTitle>
            <CardDescription>Your latest conversations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentChats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{chat.name}</h4>
                    {chat.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-500">{chat.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Analytics and Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              My Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Sessions Attended</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Messages Sent</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Connections</span>
                <span className="font-semibold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Engagement Score</span>
                <span className="font-semibold text-green-600">88%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Open Chat
            </Button>
            <Button className="w-full" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button className="w-full" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Resources
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
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
              <span className="text-sm">Total Groups</span>
              <span className="font-semibold">{stats.totalGroups}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Alumni Available</span>
              <span className="font-semibold">{stats.totalAlumni}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
