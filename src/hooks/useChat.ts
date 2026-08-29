import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage } from '@/types';

export const useChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Load contacts based on user role
    loadContacts();
    loadMessages();

    // Set up real-time subscriptions
    const messagesChannel = supabase
      .channel('chat-messages')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${user.id}`
      }, handleMessageChange)
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [user]);

  const loadContacts = async () => {
    if (!user) return;

    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, name, role, email')
        .neq('id', user.id);

      if (error) throw error;

      // Get last messages for each contact
      const contactsWithMessages = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('content, created_at')
            .or(`and(sender_id.eq.${user.id},receiver_id.eq.${profile.id}),and(sender_id.eq.${profile.id},receiver_id.eq.${user.id})`)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          const { data: unreadMessages } = await supabase
            .from('messages')
            .select('id')
            .eq('sender_id', profile.id)
            .eq('receiver_id', user.id);

          return {
            id: profile.id,
            name: profile.name,
            role: profile.role,
            email: profile.email,
            lastMessage: lastMessage?.content || 'Start a conversation',
            online: Math.random() > 0.5, // Mock online status for now
            unread: unreadMessages?.length || 0
          };
        })
      );

      setContacts(contactsWithMessages);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const loadMessages = async () => {
    if (!user) return;

    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          message_type,
          created_at
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: ChatMessage[] = messagesData?.map(msg => ({
        id: msg.id,
        senderId: msg.sender_id,
        receiverId: msg.receiver_id,
        content: msg.content,
        timestamp: new Date(msg.created_at),
        type: msg.message_type as 'text' | 'system'
      })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (payload: any) => {
    console.log('Message change:', payload);
    
    if (payload.eventType === 'INSERT') {
      const newMessage: ChatMessage = {
        id: payload.new.id,
        senderId: payload.new.sender_id,
        receiverId: payload.new.receiver_id,
        content: payload.new.content,
        timestamp: new Date(payload.new.created_at),
        type: payload.new.message_type as 'text' | 'system'
      };
      
      // Only add if it's not from current user (to avoid duplicates)
      if (payload.new.sender_id !== user?.id) {
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Refresh contacts to update last message
      loadContacts();
    }
  };

  const sendMessage = async (content: string, receiverId?: string) => {
    if (!user || !content.trim() || !receiverId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: user.id,
          receiver_id: receiverId,
          content: content.trim(),
          message_type: 'text'
        }])
        .select()
        .single();

      if (error) throw error;

      // Add message to local state immediately
      const newMessage: ChatMessage = {
        id: data.id,
        senderId: data.sender_id,
        receiverId: data.receiver_id,
        content: data.content,
        timestamp: new Date(data.created_at),
        type: data.message_type as 'text' | 'system'
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Update contacts to reflect new last message
      loadContacts();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    messages,
    contacts,
    loading,
    sendMessage
  };
};