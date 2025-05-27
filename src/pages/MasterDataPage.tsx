import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Database, 
  Building, 
  Users, 
  Home, 
  Map, 
  Tag
} from 'lucide-react';

const MasterDataPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <DashboardLayout 
      title="Master Data Management"
      headerControls={
        <Button variant="outline">
          Refresh Data
        </Button>
      }
    >
      <Card className="mx-auto">
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            <CardTitle className="text-2xl font-bold">Master Data</CardTitle>
          </div>
          <CardDescription>
            Manage projects, owners, properties, areas, and other reference data used throughout the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="projects" className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="projects" className="flex items-center">
                <Building className="mr-2 h-4 w-4" />
                <span>Projects</span>
              </TabsTrigger>
              <TabsTrigger value="owners" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Owners</span>
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Properties</span>
              </TabsTrigger>
              <TabsTrigger value="areas" className="flex items-center">
                <Map className="mr-2 h-4 w-4" />
                <span>Areas</span>
              </TabsTrigger>
              <TabsTrigger value="amenities" className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                <span>Amenities</span>
              </TabsTrigger>
              <TabsTrigger value="utilities" className="flex items-center">
                <Database className="mr-2 h-4 w-4" />
                <span>Utilities</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <Button>
                  Add New Project
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage projects that can be associated with listings. Projects include condominiums, housing estates, and other property developments.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Projects table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="owners" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Owners</h2>
                <Button>
                  Add New Owner
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage property owners in the system. Owners can be individuals or companies that own properties listed in the system.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Owners table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="properties" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Property Types</h2>
                <Button>
                  Add Property Type
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage property types such as condos, houses, townhouses, land, and commercial properties.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Property types table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="areas" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Areas & Locations</h2>
                <Button>
                  Add New Area
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage geographic areas, zones, and locations that can be associated with properties.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Areas table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Amenities</h2>
                <Button>
                  Add New Amenity
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage amenities that can be associated with properties, such as swimming pools, gyms, etc.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Amenities table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="utilities" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Utilities & Settings</h2>
                <Button>
                  Add New Setting
                </Button>
              </div>
              <p className="text-muted-foreground">
                Manage system utilities and settings related to listings and property data.
              </p>
              <Card>
                <CardContent className="p-6">
                  <div className="h-[400px] flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">Utilities table will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MasterDataPage; 