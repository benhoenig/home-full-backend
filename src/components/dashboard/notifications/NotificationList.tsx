
import React from 'react';
import { Bell, MessageSquare, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  markAllAsRead: () => void;
}

// Mock notification data
const mockNotifications = [
  {
    id: '1',
    title: 'New Lead',
    message: 'New lead received from website contact form',
    time: '10 minutes ago',
    type: 'new-lead',
    read: false
  },
  {
    id: '2',
    title: 'Warning',
    message: 'Client #A1234 has raised a complaint',
    time: '2 hours ago',
    type: 'warning',
    read: false
  },
  {
    id: '3',
    title: 'Message',
    message: 'Sales team requested update on project timeline',
    time: '1 day ago',
    type: 'message',
    read: true
  },
  {
    id: '4',
    title: 'System',
    message: 'รอโอนกรรมสิทธิ์ process is completed',
    time: '3 days ago',
    type: 'info',
    read: true
  }
];

const NotificationList = ({ markAllAsRead }: NotificationListProps) => {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'new-lead':
        return <Bell className="h-4 w-4 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const unreadCount = mockNotifications.filter(notification => !notification.read).length;

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-sm font-medium">Notifications</h3>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-primary">
            Mark all as read
          </Button>
        )}
      </div>
      <Separator />
      <ScrollArea className="h-[300px]">
        {mockNotifications.length > 0 ? (
          <div>
            {mockNotifications.map((notification) => (
              <NotificationItem 
                key={notification.id}
                notification={notification}
                icon={getIconForType(notification.type)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center">
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </ScrollArea>
      <Separator />
      <div className="p-2 text-center">
        <Button variant="ghost" size="sm" className="text-xs w-full text-muted-foreground">
          View all notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationList;
