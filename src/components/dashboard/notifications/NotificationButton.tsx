
import React, { useState } from 'react';
import { BellIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import NotificationList from './NotificationList';

interface NotificationButtonProps {
  className?: string;
}

const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [hasUnread, setHasUnread] = useState(true);
  
  const markAllAsRead = () => {
    setHasUnread(false);
  };

  return (
    <div className={cn('relative', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <NotificationList markAllAsRead={markAllAsRead} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NotificationButton;
