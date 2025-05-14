import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Check, Search, Users, Building, FileText, Phone, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface LeadSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  standalone?: boolean;
}

export function LeadSubmissionModal({ isOpen, onClose, standalone = false }: LeadSubmissionModalProps) {
  const [leadType, setLeadType] = useState<'Buyer' | 'Owner'>('Buyer');
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneLastDigits, setPhoneLastDigits] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  // Dummy data for demonstration
  const mockContacts = [
    { name: 'John Doe', gender: 'Male', type: 'Buyer', sales: 'Alex Smith' },
    { name: 'Jane Smith', gender: 'Female', type: 'Owner', sales: 'Emma Johnson' },
    { name: 'Robert Lee', gender: 'Male', type: 'Buyer', sales: 'Michael Brown' },
  ];

  const mockSalesTeam = [
    { name: 'Alex Smith', zone: 'North', rank: 'Senior', totalLeads: 24, status: 'normal' },
    { name: 'Emma Johnson', zone: 'East', rank: 'Team Lead', totalLeads: 35, status: 'normal' },
    { name: 'Michael Brown', zone: 'West', rank: 'Junior', totalLeads: 12, status: 'warning' },
    { name: 'Sarah Lee', zone: 'South', rank: 'Senior', totalLeads: 28, status: 'penalty' },
  ];

  // The form content to be used in both modal and standalone contexts
  const formContent = (
    <div className="space-y-6">
      {/* Lead Type Selection Tabs */}
      <Tabs defaultValue="Buyer" onValueChange={(value) => setLeadType(value as 'Buyer' | 'Owner')} className="w-full max-w-[300px] mx-auto mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Buyer">Buyer</TabsTrigger>
          <TabsTrigger value="Owner">Owner</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Buyer Form */}
      {leadType === 'Buyer' && (
        <div className="space-y-6">
          {/* Property Information Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Building className="mr-2 h-4 w-4" />
                Property Information
              </CardTitle>
              <CardDescription>Enter the property details for this lead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadRequirement">Lead Requirement</Label>
                  <Select>
                    <SelectTrigger id="leadRequirement">
                      <SelectValue placeholder="Select requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="propertyType">Property Type</SelectItem>
                      <SelectItem value="listingType">Listing Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listingCode">Listing Code</Label>
                  <Input id="listingCode" placeholder="Enter listing code" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input id="projectName" placeholder="Enter project name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Price / Budget</Label>
                  <Input id="budget" placeholder="Enter budget" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select>
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listingType">Listing Type</Label>
                  <Select>
                    <SelectTrigger id="listingType">
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal List</SelectItem>
                      <SelectItem value="a">A List</SelectItem>
                      <SelectItem value="exclusive">Exclusive List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Information Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Users className="mr-2 h-4 w-4" />
                Contact Information
              </CardTitle>
              <CardDescription>Search for an existing contact or enter new details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter phone number" type="tel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lineId">LINE ID</Label>
                  <Input id="lineId" placeholder="Enter LINE ID" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select>
                    <SelectTrigger id="nationality">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thai">Thai</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Label htmlFor="isAgent" className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="isAgent" 
                        className="h-4 w-4 mr-2 rounded border-gray-300 text-primary focus:ring-primary" 
                      />
                      Agent
                    </Label>
                  </div>
                  <Label htmlFor="phoneLastDigits">Phone last 4-digits</Label>
                  <Input 
                    id="phoneLastDigits" 
                    placeholder="Last 4 digits" 
                    maxLength={4}
                    value={phoneLastDigits}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,4}$/.test(value)) {
                        setPhoneLastDigits(value);
                      }
                    }}
                  />
                </div>
              </div>
              
              {phoneLastDigits.length === 4 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium text-sm">
                    Matching Contacts
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Sales</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockContacts.map((contact, index) => (
                        <TableRow key={index}>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.gender}</TableCell>
                          <TableCell>{contact.type}</TableCell>
                          <TableCell>{contact.sales}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="agentRemark">Agent Remark</Label>
                <Textarea id="agentRemark" placeholder="Enter agent remarks" className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
          
          {/* Lead Source & Assignment Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Info className="mr-2 h-4 w-4" />
                Lead Source
              </CardTitle>
              <CardDescription>Select where this lead came from and how it was contacted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactBy">Contact By</Label>
                  <Select>
                    <SelectTrigger id="contactBy">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="line">LINE</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Assignment Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Users className="mr-2 h-4 w-4" />
                Team Assignment
              </CardTitle>
              <CardDescription>Assign this lead to a team member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team">Team</Label>
                <Select onValueChange={setSelectedTeam}>
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team1">Team 1</SelectItem>
                    <SelectItem value="team2">Team 2</SelectItem>
                    <SelectItem value="team3">Team 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sales Team Table */}
              {selectedTeam && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium text-sm">
                    Available Sales Team Members
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sales Name</TableHead>
                          <TableHead>Zone</TableHead>
                          <TableHead>Rank</TableHead>
                          <TableHead>Total Monthly Lead</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSalesTeam.map((sales, index) => (
                          <TableRow key={index}>
                            <TableCell>{sales.name}</TableCell>
                            <TableCell>{sales.zone}</TableCell>
                            <TableCell>{sales.rank}</TableCell>
                            <TableCell>{sales.totalLeads}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                sales.status === 'normal' ? 'bg-green-100 text-green-800' :
                                sales.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {sales.status.charAt(0).toUpperCase() + sales.status.slice(1)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="remark">Additional Remarks</Label>
                <Textarea id="remark" placeholder="Enter any additional notes" className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Owner Form */}
      {leadType === 'Owner' && (
        <div className="space-y-6">
          {/* Property Information Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Building className="mr-2 h-4 w-4" />
                Property Information
              </CardTitle>
              <CardDescription>Enter the property details for this lead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerLeadRequirement">Lead Requirement</Label>
                  <Select>
                    <SelectTrigger id="ownerLeadRequirement">
                      <SelectValue placeholder="Select requirements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="propertyType">Property Type</SelectItem>
                      <SelectItem value="listingType">Listing Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="listingName">Listing Name</Label>
                  <Input id="listingName" placeholder="Enter listing name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerProjectName">Project Name</Label>
                  <Input id="ownerProjectName" placeholder="Enter project name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price</Label>
                  <Input id="askingPrice" placeholder="Enter asking price" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerPropertyType">Property Type</Label>
                  <Select>
                    <SelectTrigger id="ownerPropertyType">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Information Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Users className="mr-2 h-4 w-4" />
                Contact Information
              </CardTitle>
              <CardDescription>Search for an existing contact or enter new details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Name</Label>
                  <Input id="ownerName" placeholder="Enter name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Phone</Label>
                  <Input id="ownerPhone" placeholder="Enter phone number" type="tel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerLineId">LINE ID</Label>
                  <Input id="ownerLineId" placeholder="Enter LINE ID" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerGender">Gender</Label>
                  <Select>
                    <SelectTrigger id="ownerGender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerNationality">Nationality</Label>
                  <Select>
                    <SelectTrigger id="ownerNationality">
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thai">Thai</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lead Source Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Info className="mr-2 h-4 w-4" />
                Lead Source
              </CardTitle>
              <CardDescription>Select where this lead came from and how it was contacted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerSource">Source</Label>
                  <Select>
                    <SelectTrigger id="ownerSource">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ownerContactBy">Contact By</Label>
                  <Select>
                    <SelectTrigger id="ownerContactBy">
                      <SelectValue placeholder="Select contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="line">LINE</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Assignment Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-base font-medium">
                <Users className="mr-2 h-4 w-4" />
                Team Assignment
              </CardTitle>
              <CardDescription>Assign this lead to a team member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ownerTeam">Team</Label>
                <Select onValueChange={setSelectedTeam}>
                  <SelectTrigger id="ownerTeam">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team1">Team 1</SelectItem>
                    <SelectItem value="team2">Team 2</SelectItem>
                    <SelectItem value="team3">Team 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sales Team Table */}
              {selectedTeam && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium text-sm">
                    Available Sales Team Members
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sales Name</TableHead>
                          <TableHead>Zone</TableHead>
                          <TableHead>Rank</TableHead>
                          <TableHead>Total Monthly Lead</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockSalesTeam.map((sales, index) => (
                          <TableRow key={index}>
                            <TableCell>{sales.name}</TableCell>
                            <TableCell>{sales.zone}</TableCell>
                            <TableCell>{sales.rank}</TableCell>
                            <TableCell>{sales.totalLeads}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                sales.status === 'normal' ? 'bg-green-100 text-green-800' :
                                sales.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {sales.status.charAt(0).toUpperCase() + sales.status.slice(1)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 pt-2">
                <Label htmlFor="ownerRemark">Additional Remarks</Label>
                <Textarea id="ownerRemark" placeholder="Enter any additional notes" className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="flex justify-end gap-2 pt-6">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" size="lg">Submit Lead</Button>
      </div>
    </div>
  );

  // If standalone mode is true, return just the content without the Dialog wrapper
  if (standalone) {
    return formContent;
  }

  // Otherwise, return the content wrapped in a Dialog
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl">Lead Submission Form</DialogTitle>
        </DialogHeader>
        
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

export default LeadSubmissionModal; 