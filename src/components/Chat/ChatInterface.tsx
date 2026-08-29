
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/hooks/useChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Paperclip, Smile, MessageSquare } from 'lucide-react';

const ChatInterface = () => {
  const { user } = useAuth();
  const { messages, contacts, loading, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (contacts.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;

    sendMessage(newMessage, selectedContact?.id);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 p-6">
      {/* Contacts Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="space-y-1">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">
                Loading contacts...
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No contacts available</p>
                <p className="text-xs mt-1">Other users will appear here once they join</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer border-b transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {contact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.unread > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate capitalize">{contact.role.replace('_', ' ')}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          {selectedContact ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  {selectedContact.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedContact.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{selectedContact.role?.replace('_', ' ')}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
              <div>
                <h3 className="font-semibold">Select a conversation</h3>
                <p className="text-sm text-muted-foreground">Choose someone to start chatting</p>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedContact ? (
              messages
                .filter(message => 
                  (message.senderId === user?.id && message.receiverId === selectedContact.id) ||
                  (message.senderId === selectedContact.id && message.receiverId === user?.id)
                )
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a contact to start chatting</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" disabled={!selectedContact}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder={selectedContact ? "Type your message..." : "Select a contact first..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                disabled={!selectedContact}
              />
              <Button variant="ghost" size="sm" disabled={!selectedContact}>
                <Smile className="h-4 w-4" />
              </Button>
              <Button onClick={handleSendMessage} size="sm" disabled={!selectedContact || !newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
