import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

export type ListingFilterOptions = {
  marketingStatus: string[];
  listingType: string[];
  propertyType: string[];
  bedrooms: [number, number] | null;
  priceRange: [number, number] | null;
  isStarred: boolean | null;
  location: string[];
};

const defaultFilters: ListingFilterOptions = {
  marketingStatus: [],
  listingType: [],
  propertyType: [],
  bedrooms: null,
  priceRange: null,
  isStarred: null,
  location: []
};

type ListingsFilterProps = {
  onFilterChange: (filters: ListingFilterOptions) => void;
};

const ListingsFilter = ({ onFilterChange }: ListingsFilterProps) => {
  const [filters, setFilters] = useState<ListingFilterOptions>(defaultFilters);
  const [isOpen, setIsOpen] = useState(false);
  const [bedroomRange, setBedroomRange] = useState<[number, number]>([0, 6]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  
  // Count active filters
  const activeFiltersCount = [
    filters.marketingStatus.length > 0,
    filters.listingType.length > 0,
    filters.propertyType.length > 0,
    filters.bedrooms !== null,
    filters.priceRange !== null,
    filters.location.length > 0
  ].filter(Boolean).length;
  
  const handleStatusToggle = (status: string) => {
    setFilters(prev => {
      const newStatusFilters = prev.marketingStatus.includes(status)
        ? prev.marketingStatus.filter(s => s !== status)
        : [...prev.marketingStatus, status];
      
      return {
        ...prev,
        marketingStatus: newStatusFilters
      };
    });
  };
  
  const handleListingTypeToggle = (type: string) => {
    setFilters(prev => {
      const newTypeFilters = prev.listingType.includes(type)
        ? prev.listingType.filter(t => t !== type)
        : [...prev.listingType, type];
      
      return {
        ...prev,
        listingType: newTypeFilters
      };
    });
  };
  
  const handlePropertyTypeChange = (type: string) => {
    setFilters(prev => {
      const newPropertyFilters = prev.propertyType.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...prev.propertyType, type];
      
      return {
        ...prev,
        propertyType: newPropertyFilters
      };
    });
  };
  
  const handleBedroomRangeChange = (values: [number, number]) => {
    setBedroomRange(values);
    setFilters(prev => ({
      ...prev,
      bedrooms: values
    }));
  };
  
  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values);
    setFilters(prev => ({
      ...prev,
      priceRange: values
    }));
  };
  
  const handleLocationChange = (value: string) => {
    if (value) {
      setFilters(prev => ({
        ...prev,
        location: prev.location.includes(value) 
          ? prev.location.filter(l => l !== value) 
          : [...prev.location, value]
      }));
    }
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };
  
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setBedroomRange([0, 6]);
    setPriceRange([0, 50000000]);
    onFilterChange(defaultFilters);
  };
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9 w-9 p-0"
        >
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 rounded-full px-1 py-0 h-5 min-w-5 text-xs flex items-center justify-center"
            >
              {activeFiltersCount}
            </Badge>
          )}
          <span className="sr-only">Filter listings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] max-w-[320px] p-4" align="end" side="bottom" sideOffset={5}>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Marketing Status</h4>
            <div className="flex flex-wrap gap-1">
              {['Active', 'Pending', 'Sold', 'Expired'].map(status => (
                <Badge 
                  key={status}
                  variant={filters.marketingStatus.includes(status) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleStatusToggle(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Listing Type</h4>
            <div className="flex flex-wrap gap-1">
              {['Normal List', 'A List', 'Exclusive List'].map(type => (
                <Badge 
                  key={type}
                  variant={filters.listingType.includes(type) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => handleListingTypeToggle(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Property Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {['Condo', 'House', 'Townhouse', 'Land', 'Commercial'].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`property-${type}`} 
                    checked={filters.propertyType.includes(type)}
                    onCheckedChange={() => handlePropertyTypeChange(type)}
                  />
                  <Label htmlFor={`property-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Bedrooms</h4>
            <div className="px-2">
              <Slider
                min={0}
                max={6}
                step={1}
                value={bedroomRange}
                onValueChange={(values) => handleBedroomRangeChange(values as [number, number])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{bedroomRange[0]}</span>
                <span>to</span>
                <span>{bedroomRange[1] === 6 ? '6+' : bedroomRange[1]}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Price Range (THB)</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setPriceRange([value, priceRange[1]]);
                      handlePriceRangeChange([value, priceRange[1]]);
                    }}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setPriceRange([priceRange[0], value]);
                      handlePriceRangeChange([priceRange[0], value]);
                    }}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Location</h4>
            <Select
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Popular Areas</SelectLabel>
                  <SelectItem value="Sukhumvit">Sukhumvit</SelectItem>
                  <SelectItem value="Silom">Silom/Sathorn</SelectItem>
                  <SelectItem value="Thonglor">Thonglor</SelectItem>
                  <SelectItem value="Asoke">Asoke</SelectItem>
                  <SelectItem value="Ratchada">Ratchada</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {filters.location.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {filters.location.map(location => (
                  <Badge 
                    key={location}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleLocationChange(location)}
                  >
                    {location}
                    <span className="ml-1">×</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClearFilters}
              className="h-8"
            >
              Clear Filters
            </Button>
            <Button 
              onClick={handleApplyFilters}
              size="sm"
              className="h-8"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ListingsFilter; 