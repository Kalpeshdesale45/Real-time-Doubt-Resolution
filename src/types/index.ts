
export type UserRole = 'student' | 'group_leader' | 'mentor' | 'local_guardian' | 'hod' | 'alumni';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  groupId?: string;
  mentorId?: string;
  localGuardianId?: string;
  approved: boolean;
  createdAt: Date;
}

export interface Group {
  id: string;
  name: string;
  leaderId: string;
  memberIds: string[];
  mentorId?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId?: string;
  groupId?: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system';
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  scheduledAt: Date;
  duration: number;
  organizerId: string;
  participantIds: string[];
  meetUrl?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
