import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// Types for our listings data
type ListingType = 'Exclusive' | 'A List' | 'Normal';
type PropertyType = 'House' | 'Condo' | 'Land';
type ProjectLocation = 'ในโครงการ' | 'นอกโครงการ';

interface Listing {
  id: string;
  code: string;
  project: string;
  price: number;
  zone: string;
  timeOnMarket: number;
  propertyType: PropertyType;
  listingType: ListingType;
  ddScore: number;
  lvScore: number;
  fbScore: number;
  totalScore: number;
  projectLocation: ProjectLocation;
}

// Mock data for listings based on the image
const mockListings: Listing[] = [
  {
    id: '1',
    code: 'PALM001',
    project: 'Noble Cube Pattanakarn',
    price: 10000000,
    zone: 'Bang Na',
    timeOnMarket: 4,
    propertyType: 'House',
    listingType: 'Exclusive',
    ddScore: 5,
    lvScore: 4,
    fbScore: 0,
    totalScore: 9,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '2',
    code: 'PALM002',
    project: 'The Issara Ladprao',
    price: 7000000,
    zone: 'Sukhumvit',
    timeOnMarket: 6,
    propertyType: 'Condo',
    listingType: 'Exclusive',
    ddScore: 5,
    lvScore: 4,
    fbScore: 0,
    totalScore: 9,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '3',
    code: 'PALM003',
    project: 'Life Ratchada',
    price: 4000000,
    zone: 'Ratchada',
    timeOnMarket: 5,
    propertyType: 'House',
    listingType: 'A List',
    ddScore: 5,
    lvScore: 4,
    fbScore: 0,
    totalScore: 9,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '4',
    code: 'PALM004',
    project: 'Thru Thonglor',
    price: 3500000,
    zone: 'Petchburi',
    timeOnMarket: 3,
    propertyType: 'House',
    listingType: 'A List',
    ddScore: 4,
    lvScore: 3,
    fbScore: 1,
    totalScore: 8,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '5',
    code: 'PALM005',
    project: 'Noble Cube Pattanakarn',
    price: 12000000,
    zone: 'Krungthep Kreetha',
    timeOnMarket: 5,
    propertyType: 'House',
    listingType: 'A List',
    ddScore: 4,
    lvScore: 3,
    fbScore: 1,
    totalScore: 8,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '6',
    code: 'PALM006',
    project: 'The Issara Ladprao',
    price: 10000000,
    zone: 'Bang Na',
    timeOnMarket: 6,
    propertyType: 'House',
    listingType: 'A List',
    ddScore: 4,
    lvScore: 3,
    fbScore: 2,
    totalScore: 9,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '7',
    code: 'PALM007',
    project: 'Life Ratchada',
    price: 7000000,
    zone: 'Sukhumvit',
    timeOnMarket: 7,
    propertyType: 'House',
    listingType: 'A List',
    ddScore: 3,
    lvScore: 3,
    fbScore: 2,
    totalScore: 8,
    projectLocation: 'นอกโครงการ',
  },
  {
    id: '8',
    code: 'PALM008',
    project: 'Thru Thonglor',
    price: 4000000,
    zone: 'Ratchada',
    timeOnMarket: 5,
    propertyType: 'Condo',
    listingType: 'A List',
    ddScore: 3,
    lvScore: 2,
    fbScore: 1,
    totalScore: 6,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '9',
    code: 'PALM009',
    project: 'Noble Cube Pattanakarn',
    price: 3500000,
    zone: 'Petchburi',
    timeOnMarket: 4,
    propertyType: 'Condo',
    listingType: 'Normal',
    ddScore: 3,
    lvScore: 2,
    fbScore: 1,
    totalScore: 6,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '10',
    code: 'PALM010',
    project: 'The Issara Ladprao',
    price: 12000000,
    zone: 'Krungthep Kreetha',
    timeOnMarket: 5,
    propertyType: 'Condo',
    listingType: 'Normal',
    ddScore: 3,
    lvScore: 2,
    fbScore: 2,
    totalScore: 7,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '11',
    code: 'PALM011',
    project: 'Life Ratchada',
    price: 10000000,
    zone: 'Bang Na',
    timeOnMarket: 6,
    propertyType: 'House',
    listingType: 'Normal',
    ddScore: 3,
    lvScore: 1,
    fbScore: 2,
    totalScore: 6,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '12',
    code: 'PALM012',
    project: 'Thru Thonglor',
    price: 7000000,
    zone: 'Sukhumvit',
    timeOnMarket: 3,
    propertyType: 'Land',
    listingType: 'Normal',
    ddScore: 3,
    lvScore: 1,
    fbScore: 1,
    totalScore: 5,
    projectLocation: 'นอกโครงการ',
  },
  {
    id: '13',
    code: 'PALM013',
    project: 'Noble Cube Pattanakarn',
    price: 4000000,
    zone: 'Ratchada',
    timeOnMarket: 4,
    propertyType: 'Land',
    listingType: 'Normal',
    ddScore: 3,
    lvScore: 1,
    fbScore: 0,
    totalScore: 4,
    projectLocation: 'นอกโครงการ',
  },
  {
    id: '14',
    code: 'PALM014',
    project: 'The Issara Ladprao',
    price: 3500000,
    zone: 'Petchburi',
    timeOnMarket: 5,
    propertyType: 'Land',
    listingType: 'Normal',
    ddScore: 2,
    lvScore: 2,
    fbScore: 2,
    totalScore: 6,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '15',
    code: 'PALM015',
    project: 'Life Ratchada',
    price: 12000000,
    zone: 'Krungthep Kreetha',
    timeOnMarket: 5,
    propertyType: 'House',
    listingType: 'Normal',
    ddScore: 2,
    lvScore: 2,
    fbScore: 1,
    totalScore: 5,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '16',
    code: 'PALM016',
    project: 'Thru Thonglor',
    price: 3500000,
    zone: 'Petchburi',
    timeOnMarket: 3,
    propertyType: 'Condo',
    listingType: 'Normal',
    ddScore: 2,
    lvScore: 1,
    fbScore: 2,
    totalScore: 5,
    projectLocation: 'ในโครงการ',
  },
  {
    id: '17',
    code: 'PALM017',
    project: 'Life Ratchada',
    price: 4000000,
    zone: 'Krungthep Kreetha',
    timeOnMarket: 8,
    propertyType: 'Condo',
    listingType: 'Normal',
    ddScore: 2,
    lvScore: 2,
    fbScore: 3,
    totalScore: 7,
    projectLocation: 'ในโครงการ',
  }
];

const ListingsTable = () => {
  const [selectedType, setSelectedType] = useState<ListingType | 'All'>('All');
  
  // Filter listings based on selected type
  const filteredListings = selectedType === 'All' 
    ? mockListings 
    : mockListings.filter(listing => listing.listingType === selectedType);
  
  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Helper function to get badge variant based on listing type
  const getListingTypeBadge = (type: ListingType) => {
    switch (type) {
      case 'Exclusive':
        return <Badge className="bg-indigo-600 hover:bg-indigo-700">{type}</Badge>;
      case 'A List':
        return <Badge className="bg-red-600 hover:bg-red-700">{type}</Badge>;
      case 'Normal':
        return <Badge variant="outline">{type}</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // Helper function to get badge for property type
  const getPropertyTypeBadge = (type: PropertyType) => {
    switch (type) {
      case 'House':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-200">{type}</Badge>;
      case 'Condo':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-200">{type}</Badge>;
      case 'Land':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  // Helper function to get project location badge
  const getProjectLocationBadge = (location: ProjectLocation) => {
    return location === 'ในโครงการ' ? 
      <Badge variant="outline" className="bg-sky-100 text-sky-800 hover:bg-sky-200">ในโครงการ</Badge> : 
      <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-200">นอกโครงการ</Badge>;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">My Listings</h3>
        <div className="flex gap-2">
          <Button 
            variant={selectedType === 'All' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedType('All')}
          >
            All
          </Button>
          <Button 
            variant={selectedType === 'Exclusive' ? 'default' : 'outline'} 
            size="sm"
            className={selectedType === 'Exclusive' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
            onClick={() => setSelectedType('Exclusive')}
          >
            Exclusive
          </Button>
          <Button 
            variant={selectedType === 'A List' ? 'default' : 'outline'} 
            size="sm"
            className={selectedType === 'A List' ? 'bg-red-600 hover:bg-red-700' : ''}
            onClick={() => setSelectedType('A List')}
          >
            A List
          </Button>
          <Button 
            variant={selectedType === 'Normal' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedType('Normal')}
          >
            Normal
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">Listing Code</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Price Range</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead className="text-center">Time on Market</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Listing Type</TableHead>
                <TableHead className="text-center">DD</TableHead>
                <TableHead className="text-center">LV</TableHead>
                <TableHead className="text-center">FB</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead>ใน/นอกโครงการ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{listing.code}</TableCell>
                  <TableCell>{listing.project}</TableCell>
                  <TableCell className="text-right">{formatPrice(listing.price)}</TableCell>
                  <TableCell>{listing.zone}</TableCell>
                  <TableCell className="text-center">{listing.timeOnMarket}</TableCell>
                  <TableCell>{getPropertyTypeBadge(listing.propertyType)}</TableCell>
                  <TableCell>{getListingTypeBadge(listing.listingType)}</TableCell>
                  <TableCell className="text-center">{listing.ddScore}</TableCell>
                  <TableCell className="text-center">{listing.lvScore}</TableCell>
                  <TableCell className="text-center">{listing.fbScore}</TableCell>
                  <TableCell className="text-center font-medium">{listing.totalScore}</TableCell>
                  <TableCell>{getProjectLocationBadge(listing.projectLocation)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ListingsTable; 