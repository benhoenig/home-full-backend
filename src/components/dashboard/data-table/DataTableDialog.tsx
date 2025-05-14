
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Column = {
  header: string;
  accessorKey: string;
  className?: string;
  cell?: (row: any, index: number) => React.ReactNode;
};

type DataTableDialogProps = {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  showColumnCustomizer: boolean;
  onCustomize: () => void;
  isMobile: boolean;
};

const DataTableDialog: React.FC<DataTableDialogProps> = ({
  title,
  columns,
  data,
  showColumnCustomizer,
  onCustomize,
  isMobile
}) => {
  return (
    <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] h-[95vh] max-h-[95vh] p-0 rounded-lg' : 'w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] p-0'}`}>
      <div className="flex flex-col h-full overflow-hidden">
        <DialogHeader className="p-3 sm:p-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <DialogTitle className="text-base sm:text-lg">{title}</DialogTitle>
            {showColumnCustomizer && (
              <Button variant="outline" size="sm" onClick={onCustomize} className="self-start sm:self-auto whitespace-nowrap">
                <Settings className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Customize Columns</span>
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="w-full min-w-max p-2 sm:p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th 
                        key={column.accessorKey}
                        className="sticky top-0 text-left py-2 px-3 border-b border-border font-medium text-muted-foreground whitespace-nowrap bg-background"
                      >
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((row, i) => (
                      <tr key={i} className="hover:bg-muted/30">
                        {columns.map((column) => (
                          <td 
                            key={`${i}-${column.accessorKey}`}
                            className={`py-2 px-3 whitespace-nowrap border-b border-border/50 ${column.className || ''}`}
                          >
                            {column.cell ? column.cell(row, i) : row[column.accessorKey]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="py-4 text-center text-muted-foreground">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </DialogContent>
  );
};

export default DataTableDialog;
