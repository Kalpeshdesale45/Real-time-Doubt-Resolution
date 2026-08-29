import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserStats {
  totalStudents: number;
  totalLocalGuardians: number;
  totalGroupLeaders: number;
  totalAlumni: number;
  totalMentors: number;
  totalHODs: number;
  totalUsers: number;
  activeMeetings: number;
  totalGroups: number;
  completedMeetings: number;
}

export const useStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    totalStudents: 0,
    totalLocalGuardians: 0,
    totalGroupLeaders: 0,
    totalAlumni: 0,
    totalMentors: 0,
    totalHODs: 0,
    totalUsers: 0,
    activeMeetings: 0,
    totalGroups: 0,
    completedMeetings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get user counts by role
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('role');

      if (profilesError) throw profilesError;

      const roleCounts = profiles?.reduce((acc: any, profile) => {
        acc[profile.role] = (acc[profile.role] || 0) + 1;
        return acc;
      }, {}) || {};

      // Get meetings stats
      const { data: meetings, error: meetingsError } = await supabase
        .from('meetings')
        .select('status');

      if (meetingsError) throw meetingsError;

      const activeMeetings = meetings?.filter(m => m.status === 'scheduled').length || 0;
      const completedMeetings = meetings?.filter(m => m.status === 'completed').length || 0;

      // Get groups count
      const { data: groups, error: groupsError } = await supabase
        .from('groups')
        .select('id');

      if (groupsError) throw groupsError;

      setStats({
        totalStudents: roleCounts.student || 0,
        totalLocalGuardians: roleCounts.local_guardian || 0,
        totalGroupLeaders: roleCounts.group_leader || 0,
        totalAlumni: roleCounts.alumni || 0,
        totalMentors: roleCounts.mentor || 0,
        totalHODs: roleCounts.hod || 0,
        totalUsers: profiles?.length || 0,
        activeMeetings,
        totalGroups: groups?.length || 0,
        completedMeetings
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set empty stats on error
      setStats({
        totalStudents: 0,
        totalLocalGuardians: 0,
        totalGroupLeaders: 0,
        totalAlumni: 0,
        totalMentors: 0,
        totalHODs: 0,
        totalUsers: 0,
        activeMeetings: 0,
        totalGroups: 0,
        completedMeetings: 0
      });
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refreshStats: loadStats };
};