
import React from 'react';
import { Expand, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DataTableHeaderProps = {
  title: string;
  showColumnCustomizer: boolean;
  onCustomize: () => void;
  onExpand: () => void;
  extraHeaderControls?: React.ReactNode;
};

const DataTableHeader: React.FC<DataTableHeaderProps> = ({
  title,
  showColumnCustomizer,
  onCustomize,
  onExpand,
  extraHeaderControls
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="flex items-center gap-1">
        {extraHeaderControls}
        {showColumnCustomizer && (
          <Button variant="ghost" size="icon" onClick={onCustomize}>
            <Settings className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={onExpand}>
          <Expand className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DataTableHeader;
