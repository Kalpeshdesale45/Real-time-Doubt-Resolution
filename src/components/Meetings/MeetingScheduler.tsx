
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Video, Clock, Users, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const MeetingScheduler = () => {
  const { profile } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    description: '',
    duration: '60',
    participantEmail: '',
  });
  const [meetings, setMeetings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeetings();
    fetchUsers();
  }, []);

  const fetchMeetings = async () => {
    if (!profile) return;
    
    const { data, error } = await supabase
      .from('meetings')
      .select(`
        *,
        organizer:profiles!organizer_id(name, email),
        participant:profiles!participant_id(name, email)
      `)
      .or(`organizer_id.eq.${profile.id},participant_id.eq.${profile.id}`)
      .order('scheduled_at', { ascending: true });

    if (error) {
      toast.error('Failed to fetch meetings');
      console.error('Error fetching meetings:', error);
    } else {
      setMeetings(data || []);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', profile?.id || '');

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
  };

  const generateGoogleMeetLink = () => {
    // Generate a random Google Meet-style link
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const generate = (length: number) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    return `https://meet.google.com/${generate(3)}-${generate(4)}-${generate(3)}`;
  };

  const createGoogleCalendarLink = (meeting: any) => {
    const startTime = new Date(meeting.scheduled_at).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(new Date(meeting.scheduled_at).getTime() + meeting.duration * 60000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: meeting.title,
      dates: `${startTime}/${endTime}`,
      details: `${meeting.description || ''}\n\nJoin the meeting: ${meeting.meeting_url}`,
      location: meeting.meeting_url,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleScheduleMeeting = async () => {
    if (!profile || !selectedDate || !selectedTime || !meetingForm.participantEmail) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Find participant by email
    const participant = users.find(user => user.email === meetingForm.participantEmail);
    if (!participant) {
      toast.error('Participant not found');
      return;
    }

    setLoading(true);

    try {
      // Combine date and time
      const [hours, minutes] = selectedTime.split(':');
      const scheduledAt = new Date(selectedDate);
      scheduledAt.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const meetingUrl = generateGoogleMeetLink();

      const { data, error } = await supabase
        .from('meetings')
        .insert({
          title: meetingForm.title,
          description: meetingForm.description,
          scheduled_at: scheduledAt.toISOString(),
          duration: parseInt(meetingForm.duration),
          organizer_id: profile.id,
          participant_id: participant.id,
          meeting_url: meetingUrl,
          status: 'scheduled'
        })
        .select()
        .single();

      if (error) throw error;

      // Create Google Calendar link
      const calendarLink = createGoogleCalendarLink({
        ...data,
        scheduled_at: scheduledAt.toISOString(),
      });

      toast.success('Meeting scheduled successfully!', {
        action: {
          label: 'Add to Calendar',
          onClick: () => window.open(calendarLink, '_blank')
        }
      });

      // Reset form
      setMeetingForm({
        title: '',
        description: '',
        duration: '60',
        participantEmail: '',
      });
      setSelectedDate(undefined);
      setSelectedTime('');

      // Refresh meetings
      fetchMeetings();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast.error('Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date: Date) => {
    return format(date, 'PPP p');
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Meeting Management</h1>
        <p className="text-gray-600">Schedule and manage your meetings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule New Meeting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Schedule New Meeting
            </CardTitle>
            <CardDescription>Create a new Google Meet session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                placeholder="Enter meeting title"
                value={meetingForm.title}
                onChange={(e) => setMeetingForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Meeting description (optional)"
                value={meetingForm.description}
                onChange={(e) => setMeetingForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participant">Participant Email</Label>
              <Select
                value={meetingForm.participantEmail}
                onValueChange={(value) => setMeetingForm(prev => ({ ...prev, participantEmail: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select participant" />
                </SelectTrigger>
                <SelectContent>
                  {users
                    .filter(user => 
                      profile?.role === 'student' || profile?.role === 'local_guardian' 
                        ? user.role === 'alumni'
                        : user.role !== profile?.role
                    )
                    .map((user) => (
                      <SelectItem key={user.id} value={user.email}>
                        {user.name} ({user.role}) - {user.email}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select
                  value={meetingForm.duration}
                  onValueChange={(value) => setMeetingForm(prev => ({ ...prev, duration: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleScheduleMeeting} 
              className="w-full" 
              disabled={loading}
            >
              <Video className="mr-2 h-4 w-4" />
              {loading ? 'Scheduling...' : 'Schedule Meeting'}
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Meetings
            </CardTitle>
            <CardDescription>Your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {meetings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No meetings scheduled yet</p>
            ) : (
              meetings.map((meeting) => (
                <div key={meeting.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{meeting.title}</h4>
                      <p className="text-sm text-gray-600">{meeting.description}</p>
                    </div>
                    <Badge className={getStatusColor(meeting.status)}>
                      {meeting.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {formatDateTime(new Date(meeting.scheduled_at))}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {meeting.duration} min
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>
                      {meeting.organizer_id === profile?.id 
                        ? `With ${meeting.participant?.name}` 
                        : `Organized by ${meeting.organizer?.name}`
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={meeting.meeting_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Join Meeting
                      </a>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        const calendarLink = createGoogleCalendarLink(meeting);
                        window.open(calendarLink, '_blank');
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingScheduler;
