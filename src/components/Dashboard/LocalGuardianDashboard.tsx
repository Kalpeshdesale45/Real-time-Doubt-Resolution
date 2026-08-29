import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { Calendar, MessageSquare, Users, Video, BookOpen, Shield, TrendingUp, Activity, Clock } from 'lucide-react';

const LocalGuardianDashboard = () => {
  const { stats } = useStats();
  const { contacts } = useChat();
  const guardianStats = [
    { label: 'Students Under Care', value: 15, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Check-ins This Week', value: 8, icon: Video, color: 'bg-green-100 text-green-600' },
    { label: 'Support Requests', value: 3, icon: Shield, color: 'bg-purple-100 text-purple-600' },
    { label: 'Resources Provided', value: 12, icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  ];

  const studentsUnderCare = [
    { id: 1, name: 'Emma Thompson', group: 'Group A-5', status: 'doing well', lastContact: '2 days ago' },
    { id: 2, name: 'James Wilson', group: 'Group B-3', status: 'needs support', lastContact: '1 day ago' },
    { id: 3, name: 'Sophie Brown', group: 'Group C-7', status: 'excellent', lastContact: '3 days ago' },
    { id: 4, name: 'Ryan Davis', group: 'Group A-5', status: 'improving', lastContact: '1 day ago' },
  ];

  const upcomingCheckIns = [
    {
      id: 1,
      title: 'Weekly Wellness Check',
      student: 'Emma Thompson',
      time: 'Today 4:00 PM',
      type: 'Individual Check-in',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Support Session',
      student: 'James Wilson',
      time: 'Tomorrow 2:00 PM',
      type: 'Support Meeting',
      priority: 'high'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'doing well': 'bg-green-100 text-green-800',
      'needs support': 'bg-red-100 text-red-800',
      'excellent': 'bg-blue-100 text-blue-800',
      'improving': 'bg-yellow-100 text-yellow-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Local Guardian Dashboard</h1>
        <p className="text-gray-600">Support and monitor student wellbeing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guardianStats.map((stat, index) => (
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
              Students Under Care
            </CardTitle>
            <CardDescription>Monitor and support your students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentsUnderCare.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.group}</p>
                  <p className="text-xs text-gray-500">Last contact {student.lastContact}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Check-ins
            </CardTitle>
            <CardDescription>Scheduled student support sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingCheckIns.map((checkIn) => (
              <div key={checkIn.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{checkIn.title}</h4>
                  <p className="text-sm text-gray-600">with {checkIn.student}</p>
                  <p className="text-sm text-gray-500">{checkIn.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={checkIn.priority === 'high' ? 'destructive' : 'secondary'}>
                    {checkIn.priority} priority
                  </Badge>
                  <Button size="sm">Join</Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Video className="mr-2 h-4 w-4" />
              Schedule Check-in
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
              Guardian Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Student Wellness</span>
                <span className="font-semibold text-green-600">91%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Check-ins Completed</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Conversations</span>
                <span className="font-semibold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Response Rate</span>
                <span className="font-semibold text-blue-600">98%</span>
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
              Student Chat
            </Button>
            <Button className="w-full" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Welfare Check
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Check-in
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Students</span>
              <span className="font-semibold">{stats.totalStudents}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Groups</span>
              <span className="font-semibold">{stats.totalGroups}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Meetings</span>
              <span className="font-semibold">{stats.activeMeetings}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Service Status</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocalGuardianDashboard;