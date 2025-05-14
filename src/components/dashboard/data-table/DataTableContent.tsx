
import React from 'react';
import { Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

type Column = {
  header: string;
  accessorKey: string;
  className?: string;
  cell?: (row: any, index: number) => React.ReactNode;
};

type DataTableContentProps = {
  columns: Column[];
  data: Record<string, any>[];
};

const DataTableContent: React.FC<DataTableContentProps> = ({
  columns,
  data
}) => {
  return (
    <div className="w-full overflow-hidden border rounded-md">
      <ScrollArea className="w-full">
        <div className="w-full min-w-max">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.accessorKey}
                    className="text-left py-1.5 px-3 border-b border-border font-medium text-muted-foreground whitespace-nowrap"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="w-8 border-b border-border"></th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    {columns.map((column) => (
                      <td 
                        key={`${i}-${column.accessorKey}`}
                        className={`py-1.5 px-3 whitespace-nowrap border-b border-border/50 ${column.className || ''}`}
                      >
                        {column.cell ? column.cell(row, i) : row[column.accessorKey]}
                      </td>
                    ))}
                    <td className="text-right pr-2 border-b border-border/50">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Expand className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-3 text-center text-muted-foreground">
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
  );
};

export default DataTableContent;
