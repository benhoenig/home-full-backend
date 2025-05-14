
import React, { useState } from 'react';
import { Expand, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ColumnKey } from '@/hooks/useDataTableColumns';
import ColumnCustomizer from '../leads-table/ColumnCustomizer';
import DataTableHeader from './DataTableHeader';
import DataTableContent from './DataTableContent';
import DataTableDialog from './DataTableDialog';
import { useIsMobile } from '@/hooks/use-mobile';

type Column = {
  header: string;
  accessorKey: string;
  className?: string;
  cell?: (row: any, index: number) => React.ReactNode;
};

type DataTableProps<T extends ColumnKey> = {
  title: string;
  columns: Column[];
  data: Record<string, any>[];
  visibleColumns?: T[];
  setVisibleColumns?: React.Dispatch<React.SetStateAction<T[]>>;
  columnOrder?: T[];
  setColumnOrder?: React.Dispatch<React.SetStateAction<T[]>>;
  defaultVisibleColumns?: T[];
  defaultColumnOrder?: T[];
  allPossibleColumns?: Column[];
  showColumnCustomizer?: boolean;
  extraHeaderControls?: React.ReactNode;
};

export function DataTable<T extends ColumnKey>({ 
  title, 
  columns, 
  data,
  visibleColumns,
  setVisibleColumns,
  columnOrder,
  setColumnOrder,
  defaultVisibleColumns,
  defaultColumnOrder,
  allPossibleColumns,
  showColumnCustomizer = false,
  extraHeaderControls
}: DataTableProps<T>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCustomizeDialogOpen, setIsCustomizeDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="data-card overflow-hidden">
        <DataTableHeader 
          title={title}
          showColumnCustomizer={showColumnCustomizer}
          extraHeaderControls={extraHeaderControls}
          onCustomize={() => setIsCustomizeDialogOpen(true)}
          onExpand={() => setIsDialogOpen(true)}
        />
        
        <DataTableContent 
          columns={columns} 
          data={data} 
        />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DataTableDialog 
          title={title}
          columns={columns}
          data={data}
          showColumnCustomizer={showColumnCustomizer}
          onCustomize={() => setIsCustomizeDialogOpen(true)}
          isMobile={isMobile}
        />
      </Dialog>

      {showColumnCustomizer && allPossibleColumns && visibleColumns && setVisibleColumns && columnOrder && setColumnOrder && defaultVisibleColumns && defaultColumnOrder && (
        <Dialog open={isCustomizeDialogOpen} onOpenChange={setIsCustomizeDialogOpen}>
          <ColumnCustomizer 
            allColumns={allPossibleColumns}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            columnOrder={columnOrder}
            setColumnOrder={setColumnOrder}
            defaultVisibleColumns={defaultVisibleColumns}
            defaultColumnOrder={defaultColumnOrder}
          />
        </Dialog>
      )}
    </>
  );
}

export default DataTable;
