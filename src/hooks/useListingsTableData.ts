import { useState } from 'react';

export type Listing = {
  // Basic listing information
  listingCode: string;
  marketingStatus: string;
  monthsOnSale: number;
  listingType: 'Normal List' | 'A List' | 'Exclusive List';
  listingStatus: 'For Sale' | 'For Rent' | 'For Sale & Rent' | 'ขายพร้อมผู้เช่า' | 'ขายดาวน์';
  
  // Owner information
  ownerName: string;
  ownerContact: string;
  
  // Property information
  listingName: string;
  propertyType: string;
  projectName: string;
  inProject: 'ในโครงการ' | 'นอกโครงการ';
  streetSoi: string;
  zoneArea: string;
  bts: string;
  mrt: string;
  arl: string;
  locationGrade: string;
  bedrooms: number;
  bathrooms: number;
  unitNo: string;
  rai: number;
  ngan: number;
  wa: number;
  usableArea: number;
  condoArea?: number;
  floors: number;
  building: string;
  floor: number;
  parking: number;
  view: string[];
  direction: string;
  matchingTags: string[];
  
  // Price information
  askingPrice: number;
  rentalPrice?: number;
  netPrice: number;
  pricePerSqw?: number; // auto-calculated
  pricePerUsableArea?: number; // auto-calculated
  pricePerSqm?: number; // auto-calculated
  
  // Additional information
  googleMapsLink: string;
  remark: string;
  listingPhotos: string[];
  thumbnailUrl?: string; // Thumbnail image URL
  
  // A & Exclusive Section
  propertyHook?: string;
  giveaways?: string[];
  commonAreas?: string[];
  environment?: string[];
  locations?: string[];
  locationRemark?: string;
  transitDistance?: { name: string; distance: number }[];
  hospitalDistance?: { name: string; distance: number }[];
  educationDistance?: { name: string; distance: number }[];
  mallDistance?: { name: string; distance: number }[];
  targetBuyer?: string[];
  ageRange?: string;
  occupations?: string;
  investors?: string[];
  targetBuyerRemark?: string;
  monthlyPayment?: number;
  targetSalary?: number;
  hashtags?: string[];
  
  // Owner Focus
  isStarred?: boolean;
  timeConsulted?: number; // auto-calculated
  lastMatch?: number;
  ownerType?: 'Critical' | 'Alert' | 'Chill';
  propertyCondition?: string[];
  lastMatchDiff?: number; // auto-calculated
  
  // Metadata
  createdBy: string;
  createdTime: string;
  lastModifiedTime: string;
  assignedTo: string;
};

// Creating a default column order based on common importance
export const defaultColumnOrder: (keyof Listing)[] = [
  "listingCode",
  "marketingStatus",
  "monthsOnSale",
  "listingType",
  "listingStatus",
  "ownerName",
  "ownerContact",
  "listingName",
  "propertyType",
  "projectName",
  "inProject",
  "zoneArea",
  "bedrooms",
  "bathrooms",
  "askingPrice",
  "rentalPrice",
  "createdTime",
  "assignedTo"
];

// Default columns to display
export const defaultVisibleColumns: (keyof Listing)[] = [
  "listingCode",
  "marketingStatus",
  "listingType",
  "listingName",
  "propertyType",
  "bedrooms",
  "askingPrice",
  "ownerName",
  "assignedTo"
];

export function useListingsTableData() {
  // Mock data for listings
  const [data] = useState<Listing[]>([
    {
      listingCode: "BKK001",
      marketingStatus: "Active",
      monthsOnSale: 3,
      listingType: "Normal List",
      listingStatus: "For Sale",
      ownerName: "John Smith",
      ownerContact: "+66-81-234-5678",
      listingName: "The Garden Condo",
      propertyType: "Condo",
      projectName: "The Garden",
      inProject: "ในโครงการ",
      streetSoi: "Sukhumvit 22",
      zoneArea: "Sukhumvit",
      bts: "Phrom Phong",
      mrt: "",
      arl: "",
      locationGrade: "A",
      bedrooms: 2,
      bathrooms: 2,
      unitNo: "507",
      rai: 0,
      ngan: 0,
      wa: 0,
      usableArea: 65,
      condoArea: 65,
      floors: 30,
      building: "A",
      floor: 5,
      parking: 1,
      view: ["City"],
      direction: "North",
      matchingTags: ["Pet Friendly", "Pool View"],
      askingPrice: 7500000,
      rentalPrice: 30000,
      netPrice: 7350000,
      pricePerSqm: 115385,
      googleMapsLink: "https://goo.gl/maps/abc123",
      remark: "Fully furnished",
      listingPhotos: ["photo1.jpg", "photo2.jpg"],
      thumbnailUrl: "https://placehold.co/600x400/png",
      createdBy: "Agent1",
      createdTime: "2023-06-15T10:00:00",
      lastModifiedTime: "2023-07-20T15:30:00",
      assignedTo: "Agent2"
    },
    {
      listingCode: "BKK002",
      marketingStatus: "Pending",
      monthsOnSale: 1,
      listingType: "A List",
      listingStatus: "For Rent",
      ownerName: "Jane Doe",
      ownerContact: "+66-89-876-5432",
      listingName: "Luxury House Thonglor",
      propertyType: "House",
      projectName: "",
      inProject: "นอกโครงการ",
      streetSoi: "Thonglor 10",
      zoneArea: "Thonglor",
      bts: "Thonglor",
      mrt: "",
      arl: "",
      locationGrade: "A+",
      bedrooms: 4,
      bathrooms: 5,
      unitNo: "",
      rai: 0,
      ngan: 1,
      wa: 50,
      usableArea: 350,
      floors: 3,
      building: "",
      floor: 0,
      parking: 2,
      view: ["Garden", "Pool"],
      direction: "East",
      matchingTags: ["Private Pool", "Garden"],
      askingPrice: 45000000,
      rentalPrice: 150000,
      netPrice: 44000000,
      pricePerSqw: 880000,
      googleMapsLink: "https://goo.gl/maps/def456",
      remark: "Newly renovated",
      listingPhotos: ["photo3.jpg", "photo4.jpg"],
      thumbnailUrl: "https://placehold.co/600x400/e3a12b/white?text=Luxury+House",
      propertyHook: "Rare find in Thonglor area with private pool",
      giveaways: ["Furniture", "Appliances"],
      commonAreas: ["Gym", "Garden"],
      environment: ["Quiet", "Safe"],
      targetBuyer: ["Expat", "Family"],
      isStarred: true,
      ownerType: "Chill",
      createdBy: "Agent3",
      createdTime: "2023-07-01T09:15:00",
      lastModifiedTime: "2023-07-25T11:20:00",
      assignedTo: "Agent3"
    },
    {
      listingCode: "BKK003",
      marketingStatus: "Sold",
      monthsOnSale: 5,
      listingType: "Exclusive List",
      listingStatus: "For Sale",
      ownerName: "Michael Wong",
      ownerContact: "+66-83-456-7890",
      listingName: "Park24",
      propertyType: "Condo",
      projectName: "Park24",
      inProject: "ในโครงการ",
      streetSoi: "Sukhumvit 24",
      zoneArea: "Sukhumvit",
      bts: "Phrom Phong",
      mrt: "",
      arl: "",
      locationGrade: "A",
      bedrooms: 1,
      bathrooms: 1,
      unitNo: "1205",
      rai: 0,
      ngan: 0,
      wa: 0,
      usableArea: 35,
      condoArea: 35,
      floors: 40,
      building: "B",
      floor: 12,
      parking: 1,
      view: ["City", "Park"],
      direction: "South",
      matchingTags: ["Corner Unit", "Renovated"],
      askingPrice: 5200000,
      netPrice: 5100000,
      pricePerSqm: 148571,
      googleMapsLink: "https://goo.gl/maps/ghi789",
      remark: "High floor with great view",
      listingPhotos: ["photo5.jpg", "photo6.jpg"],
      thumbnailUrl: "https://placehold.co/600x400/3498db/white?text=Park24",
      propertyHook: "Best view in the building",
      isStarred: true,
      lastMatch: 5000000,
      lastMatchDiff: -3.85,
      createdBy: "Agent4",
      createdTime: "2023-05-10T14:00:00",
      lastModifiedTime: "2023-07-15T09:45:00",
      assignedTo: "Agent1"
    },
    {
      listingCode: "BKK004",
      marketingStatus: "Active",
      monthsOnSale: 2,
      listingType: "Normal List",
      listingStatus: "For Sale & Rent",
      ownerName: "Sarah Johnson",
      ownerContact: "+66-84-567-8901",
      listingName: "The Line Asoke",
      propertyType: "Condo",
      projectName: "The Line Asoke",
      inProject: "ในโครงการ",
      streetSoi: "Asoke",
      zoneArea: "Asoke",
      bts: "Asoke",
      mrt: "Sukhumvit",
      arl: "",
      locationGrade: "A+",
      bedrooms: 2,
      bathrooms: 2,
      unitNo: "2310",
      rai: 0,
      ngan: 0,
      wa: 0,
      usableArea: 55,
      condoArea: 55,
      floors: 35,
      building: "",
      floor: 23,
      parking: 1,
      view: ["City"],
      direction: "West",
      matchingTags: ["High Floor", "Corner Unit"],
      askingPrice: 9800000,
      rentalPrice: 45000,
      netPrice: 9600000,
      pricePerSqm: 178182,
      googleMapsLink: "https://goo.gl/maps/jkl012",
      remark: "Prime location",
      listingPhotos: ["photo7.jpg", "photo8.jpg"],
      thumbnailUrl: "https://placehold.co/600x400/2ecc71/white?text=The+Line+Asoke",
      createdBy: "Agent2",
      createdTime: "2023-06-22T16:30:00",
      lastModifiedTime: "2023-07-18T13:10:00",
      assignedTo: "Agent4"
    }
  ]);

  return data;
} 