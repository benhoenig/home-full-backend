
import React from 'react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: string;
  read: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  icon: React.ReactNode;
}

const NotificationItem = ({ notification, icon }: NotificationItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer transition-colors",
        !notification.read && "bg-muted/30"
      )}
    >
      <div className="mt-0.5">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground">{notification.time}</p>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
