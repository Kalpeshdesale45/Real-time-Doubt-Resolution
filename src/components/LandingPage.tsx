
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Video, MessageSquare, Shield, BookOpen, Award } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Structured communication between students, mentors, and alumni with appropriate permissions.'
    },
    {
      icon: Video,
      title: 'Video Meetings',
      description: 'Schedule and join Google Meet sessions for face-to-face interactions and guidance.'
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Chat',
      description: 'Instant messaging with group chats and one-on-one conversations based on your role.'
    },
    {
      icon: Shield,
      title: 'Secure & Monitored',
      description: 'All communications are logged and monitored for safety and compliance.'
    },
    {
      icon: BookOpen,
      title: 'Academic Support',
      description: 'Get guidance from mentors and connect with alumni for career advice.'
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Build professional networks and gain insights from industry experts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EduConnect</h1>
          </div>
          <Button onClick={onGetStarted} className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect. Learn. <span className="text-blue-600">Grow.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A comprehensive communication platform designed for colleges to facilitate 
            structured interactions between students, mentors, and alumni.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Join Your College Network
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need for Academic Success
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">
            Built for Every Role
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { role: 'Students', desc: 'Connect with peers and alumni' },
              { role: 'Group Leaders', desc: 'Lead your team effectively' },
              { role: 'Mentors', desc: 'Guide and support students' },
              { role: 'Local Guardians', desc: 'Oversee mentor activities' },
              { role: 'HOD', desc: 'Monitor and manage all activities' },
              { role: 'Alumni', desc: 'Share experience and knowledge' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <h4 className="font-semibold text-gray-900">{item.role}</h4>
                  <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 EduConnect. Empowering education through structured communication.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
