import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStats } from '@/hooks/useStats';
import { useChat } from '@/hooks/useChat';
import { Calendar, MessageSquare, Users, Video, BookOpen, TrendingUp, Activity, Clock, GraduationCap, Briefcase } from 'lucide-react';

const AlumniDashboard = () => {
  const { stats } = useStats();
  const { contacts } = useChat();
  const alumniStats = [
    { label: 'Students Mentored', value: 12, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Sessions This Month', value: 18, icon: Video, color: 'bg-green-100 text-green-600' },
    { label: 'Career Guidance', value: 8, icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Resources Shared', value: 25, icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
  ];


  const upcomingSessions = [
    {
      id: 1,
      title: 'Career Guidance Session',
      student: 'Alice Johnson',
      time: 'Today 3:00 PM',
      type: 'Career Counseling',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'Industry Insights Discussion',
      student: 'Bob Smith',
      time: 'Tomorrow 11:00 AM',
      type: 'Industry Talk',
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'Resume Review',
      student: 'Carol Davis',
      time: 'Friday 2:00 PM',
      type: 'Resume Review',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alumni Dashboard</h1>
        <p className="text-gray-600">Share your experience and guide the next generation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {alumniStats.map((stat, index) => (
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

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your scheduled mentorship sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{session.title}</h4>
                  <p className="text-sm text-gray-600">with {session.student}</p>
                  <p className="text-sm text-gray-500">{session.time}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={session.status === 'confirmed' ? 'secondary' : 'outline'}>
                    {session.status}
                  </Badge>
                  <Button size="sm" disabled={session.status === 'pending'}>
                    {session.status === 'pending' ? 'Pending' : 'Join'}
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Offer Mentorship Session
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
              Alumni Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Students Mentored</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Success Stories</span>
                <span className="font-semibold text-green-600">38</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Conversations</span>
                <span className="font-semibold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Satisfaction Rate</span>
                <span className="font-semibold text-blue-600">97%</span>
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
              <BookOpen className="mr-2 h-4 w-4" />
              Share Resources
            </Button>
            <Button className="w-full" variant="outline">
              <GraduationCap className="mr-2 h-4 w-4" />
              Career Guidance
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Network Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Total Students</span>
              <span className="font-semibold">{stats.totalStudents}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Fellow Alumni</span>
              <span className="font-semibold">{stats.totalAlumni - 1}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Groups</span>
              <span className="font-semibold">{stats.totalGroups}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Platform Status</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlumniDashboard;