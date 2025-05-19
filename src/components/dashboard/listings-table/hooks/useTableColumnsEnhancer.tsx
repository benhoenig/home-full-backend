import React, { useMemo } from 'react';
import { Listing } from '@/hooks/useListingsTableData';
import { formatCurrency } from '@/lib/utils';
import { CheckCircleIcon, Clock3Icon, XCircleIcon, AlertCircleIcon } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type Column = {
  header: string;
  accessorKey: keyof Listing;
  cell?: (listing: Listing, index: number) => React.ReactNode;
  className?: string;
};

export function useTableColumnsEnhancer(
  columns: Column[],
  handleMarketingStatusChange: (listing: Listing, newStatus: string) => void,
  handleListingTypeChange: (listing: Listing, newType: string) => void
) {
  return useMemo(() => {
    return columns.map(column => {
      // Format specific columns
      if (column.accessorKey === 'marketingStatus') {
        return {
          ...column,
          cell: (listing: Listing) => (
            <Select 
              value={listing.marketingStatus} 
              onValueChange={(value) => handleMarketingStatusChange(listing, value)}
            >
              <SelectTrigger className="h-8 w-32">
                <SelectValue>
                  <StatusBadge status={listing.marketingStatus} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          )
        };
      }
      
      if (column.accessorKey === 'listingType') {
        return {
          ...column,
          cell: (listing: Listing) => (
            <Select 
              value={listing.listingType} 
              onValueChange={(value) => handleListingTypeChange(listing, value)}
            >
              <SelectTrigger className="h-8 w-36">
                <SelectValue>
                  <TypeBadge type={listing.listingType} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal List">Normal List</SelectItem>
                <SelectItem value="A List">A List</SelectItem>
                <SelectItem value="Exclusive List">Exclusive List</SelectItem>
              </SelectContent>
            </Select>
          )
        };
      }
      
      if (column.accessorKey === 'askingPrice' || column.accessorKey === 'rentalPrice' || 
          column.accessorKey === 'netPrice' || column.accessorKey === 'pricePerSqw' ||
          column.accessorKey === 'pricePerUsableArea' || column.accessorKey === 'pricePerSqm' ||
          column.accessorKey === 'lastMatch') {
        return {
          ...column,
          cell: (listing: Listing) => {
            const value = listing[column.accessorKey];
            return value !== undefined && value !== null
              ? formatCurrency(value as number)
              : '-';
          }
        };
      }
      
      if (column.accessorKey === 'monthsOnSale') {
        return {
          ...column,
          cell: (listing: Listing) => {
            const months = listing.monthsOnSale;
            
            let textColor = 'text-slate-600';
            if (months >= 6) textColor = 'text-rose-600';
            else if (months >= 3) textColor = 'text-amber-600';
            
            return <span className={`font-medium ${textColor}`}>{months}</span>;
          }
        };
      }
      
      if (column.accessorKey === 'ownerType') {
        return {
          ...column,
          cell: (listing: Listing) => {
            const ownerType = listing.ownerType;
            
            if (!ownerType) return '-';
            
            const colorMap = {
              'Critical': 'bg-rose-100 text-rose-800',
              'Alert': 'bg-amber-100 text-amber-800',
              'Chill': 'bg-teal-100 text-teal-800'
            };
            
            return (
              <Badge className={`${colorMap[ownerType]}`}>
                {ownerType}
              </Badge>
            );
          }
        };
      }
      
      if (column.accessorKey === 'listingStatus') {
        return {
          ...column,
          cell: (listing: Listing) => {
            const statusColorMap = {
              'For Sale': 'bg-green-100 text-green-800',
              'For Rent': 'bg-blue-100 text-blue-800',
              'For Sale & Rent': 'bg-purple-100 text-purple-800',
              'ขายพร้อมผู้เช่า': 'bg-amber-100 text-amber-800',
              'ขายดาวน์': 'bg-indigo-100 text-indigo-800'
            };
            
            return (
              <Badge className={`${statusColorMap[listing.listingStatus]}`}>
                {listing.listingStatus}
              </Badge>
            );
          }
        };
      }
      
      return column;
    });
  }, [columns, handleMarketingStatusChange, handleListingTypeChange]);
}

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Active':
      return (
        <div className="flex items-center">
          <CheckCircleIcon className="h-3.5 w-3.5 text-teal-600 mr-2" />
          <span className="text-teal-700">Active</span>
        </div>
      );
    case 'Pending':
      return (
        <div className="flex items-center">
          <Clock3Icon className="h-3.5 w-3.5 text-amber-600 mr-2" />
          <span className="text-amber-700">Pending</span>
        </div>
      );
    case 'Sold':
      return (
        <div className="flex items-center">
          <CheckCircleIcon className="h-3.5 w-3.5 text-purple-600 mr-2" />
          <span className="text-purple-700">Sold</span>
        </div>
      );
    case 'Expired':
      return (
        <div className="flex items-center">
          <XCircleIcon className="h-3.5 w-3.5 text-slate-600 mr-2" />
          <span className="text-slate-700">Expired</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <AlertCircleIcon className="h-3.5 w-3.5 text-slate-600 mr-2" />
          <span className="text-slate-700">{status}</span>
        </div>
      );
  }
};

const TypeBadge = ({ type }: { type: string }) => {
  switch (type) {
    case 'Normal List':
      return <span className="text-slate-700">Normal List</span>;
    case 'A List':
      return <span className="text-teal-700 font-medium">A List</span>;
    case 'Exclusive List':
      return <span className="text-purple-700 font-medium">Exclusive List</span>;
    default:
      return <span className="text-slate-700">{type}</span>;
  }
}; 