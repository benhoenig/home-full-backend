
import React from 'react';
import { Badge } from '@/components/ui/badge';

type ActivityLogItemProps = {
  logItem: {
    id: string;
    type: 'system_log' | 'user_comment';  // Updated to accept both types
    tag?: string;
    content: string;
    date: string;
    timestamp?: number;  // Added as optional since we have it in the parent
    user?: {  // Added user property as optional
      name?: string;
      avatarUrl?: string;
      initials?: string;
    };
  };
};

const getTagColor = (tag?: string) => {
  switch (tag?.toLowerCase()) {
    case 'status change':
      return 'bg-blue-100 text-blue-800';
    case 'phone call':
      return 'bg-green-100 text-green-800';
    case 'email sent':
      return 'bg-purple-100 text-purple-800';
    case 'meeting scheduled':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ActivityLogItem = ({ logItem }: ActivityLogItemProps) => {
  // Only render the component for system_log type items
  if (logItem.type !== 'system_log') return null;

  return (
    <div className="flex items-center text-xs text-gray-600">
      <div className="flex-none mr-1">•</div>
      <span className="truncate flex-1">
        {logItem.tag && (
          <Badge className={`mr-1 px-1 py-0.5 font-medium ${getTagColor(logItem.tag)}`}>
            {logItem.tag}
          </Badge>
        )}
        {logItem.content}
      </span>
      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{logItem.date}</span>
    </div>
  );
};

export default ActivityLogItem;
