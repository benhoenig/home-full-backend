import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem as UISelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Gift, Building2, Users, Briefcase, Clock, Map, MapPin, Building, School, Hospital, ShoppingBag, X } from "lucide-react";
import MultiSelectSearch, { SelectItem } from '../MultiSelectSearch';
import { Button } from "@/components/ui/button";

const AExclusiveTab: React.FC = () => {
  // Sample data - In a real app, this would come from an API or props
  const [giveaways, setGiveaways] = useState<SelectItem[]>([
    { id: 'furniture', name: 'Furniture' },
    { id: 'appliances', name: 'Appliances' },
    { id: 'fixtures', name: 'Fixtures' },
    { id: 'renovations', name: 'Renovations' }
  ]);
  const [selectedGiveaways, setSelectedGiveaways] = useState<string[]>([]);

  const [commonAreas, setCommonAreas] = useState<SelectItem[]>([
    { id: 'gym', name: 'Gym' },
    { id: 'pool', name: 'Pool' },
    { id: 'garden', name: 'Garden' },
    { id: 'playground', name: 'Playground' },
    { id: 'lobby', name: 'Lobby' },
    { id: 'parking', name: 'Parking' }
  ]);
  const [selectedCommonAreas, setSelectedCommonAreas] = useState<string[]>([]);

  const [targetBuyers, setTargetBuyers] = useState<SelectItem[]>([
    { id: 'expat', name: 'Expat' },
    { id: 'local', name: 'Local' },
    { id: 'family', name: 'Family' },
    { id: 'investor', name: 'Investor' },
    { id: 'corporate', name: 'Corporate' }
  ]);
  const [selectedTargetBuyers, setSelectedTargetBuyers] = useState<string[]>([]);

  // New Investor Features state
  const [investorFeatures, setInvestorFeatures] = useState<SelectItem[]>([
    { id: 'high-yield', name: 'High Yield' },
    { id: 'rental-guarantee', name: 'Rental Guarantee' },
    { id: 'long-term-tenants', name: 'Long-term Tenants' },
    { id: 'capital-appreciation', name: 'Capital Appreciation' },
    { id: 'low-maintenance', name: 'Low Maintenance' }
  ]);
  const [selectedInvestorFeatures, setSelectedInvestorFeatures] = useState<string[]>([]);

  // Unit Condition options
  const [unitConditions, setUnitConditions] = useState<SelectItem[]>([
    { id: 'brand-new', name: 'Brand New' },
    { id: 'like-new', name: 'Like New' },
    { id: 'renovated', name: 'Renovated' },
    { id: 'good', name: 'Good Condition' },
    { id: 'fair', name: 'Fair Condition' },
    { id: 'needs-work', name: 'Needs Work' }
  ]);
  const [selectedUnitConditions, setSelectedUnitConditions] = useState<string[]>([]);

  // Age range options
  const [ageRanges, setAgeRanges] = useState<SelectItem[]>([
    { id: '18-24', name: '18-24 ปี' },
    { id: '25-34', name: '25-34 ปี' },
    { id: '35-44', name: '35-44 ปี' },
    { id: '45-55', name: '45-55 ปี' },
    { id: '55+', name: '55 ปีขึ้นไป' }
  ]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<string[]>([]);

  // Environment options
  const [environments, setEnvironments] = useState<SelectItem[]>([
    { id: 'quiet', name: 'Quiet' },
    { id: 'busy', name: 'Busy/Urban' },
    { id: 'suburban', name: 'Suburban' },
    { id: 'nature', name: 'Close to Nature' },
    { id: 'riverside', name: 'Riverside' }
  ]);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  // Location options
  const [locations, setLocations] = useState<SelectItem[]>([
    { id: 'cbd', name: 'CBD' },
    { id: 'business-district', name: 'Business District' },
    { id: 'residential', name: 'Residential Area' },
    { id: 'shopping-area', name: 'Shopping Area' },
    { id: 'educational-zone', name: 'Educational Zone' }
  ]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  // Transit distances
  const [transitStations, setTransitStations] = useState([
    { name: '', distance: 0 }
  ]);

  // Hospital distances
  const [hospitals, setHospitals] = useState([
    { name: '', distance: 0 }
  ]);

  // Education distances
  const [educationPlaces, setEducationPlaces] = useState([
    { name: '', distance: 0 }
  ]);

  // Mall distances
  const [malls, setMalls] = useState([
    { name: '', distance: 0 }
  ]);

  // Monthly payment and target salary
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [targetSalary, setTargetSalary] = useState<string>('');

  const handleSelectGiveaway = (id: string) => {
    setSelectedGiveaways(prev => [...prev, id]);
  };

  const handleRemoveGiveaway = (id: string) => {
    setSelectedGiveaways(prev => prev.filter(giveawayId => giveawayId !== id));
  };

  const handleAddNewGiveaway = (name: string) => {
    const newId = `giveaway-${Date.now()}`;
    const newGiveaway = { id: newId, name };
    setGiveaways(prev => [...prev, newGiveaway]);
    setSelectedGiveaways(prev => [...prev, newId]);
  };

  const handleSelectCommonArea = (id: string) => {
    setSelectedCommonAreas(prev => [...prev, id]);
  };

  const handleRemoveCommonArea = (id: string) => {
    setSelectedCommonAreas(prev => prev.filter(areaId => areaId !== id));
  };

  const handleAddNewCommonArea = (name: string) => {
    const newId = `area-${Date.now()}`;
    const newArea = { id: newId, name };
    setCommonAreas(prev => [...prev, newArea]);
    setSelectedCommonAreas(prev => [...prev, newId]);
  };

  const handleSelectTargetBuyer = (id: string) => {
    setSelectedTargetBuyers(prev => [...prev, id]);
  };

  const handleRemoveTargetBuyer = (id: string) => {
    setSelectedTargetBuyers(prev => prev.filter(buyerId => buyerId !== id));
  };

  const handleAddNewTargetBuyer = (name: string) => {
    const newId = `buyer-${Date.now()}`;
    const newBuyer = { id: newId, name };
    setTargetBuyers(prev => [...prev, newBuyer]);
    setSelectedTargetBuyers(prev => [...prev, newId]);
  };

  // New handler functions for Investor Features
  const handleSelectInvestorFeature = (id: string) => {
    setSelectedInvestorFeatures(prev => [...prev, id]);
  };

  const handleRemoveInvestorFeature = (id: string) => {
    setSelectedInvestorFeatures(prev => prev.filter(featureId => featureId !== id));
  };

  const handleAddNewInvestorFeature = (name: string) => {
    const newId = `investor-feature-${Date.now()}`;
    const newFeature = { id: newId, name };
    setInvestorFeatures(prev => [...prev, newFeature]);
    setSelectedInvestorFeatures(prev => [...prev, newId]);
  };

  // Handler functions for age ranges
  const handleSelectAgeRange = (id: string) => {
    setSelectedAgeRanges(prev => [...prev, id]);
  };

  const handleRemoveAgeRange = (id: string) => {
    setSelectedAgeRanges(prev => prev.filter(ageId => ageId !== id));
  };

  // Unit Condition handlers
  const handleSelectUnitCondition = (id: string) => {
    setSelectedUnitConditions(prev => [...prev, id]);
  };

  const handleRemoveUnitCondition = (id: string) => {
    setSelectedUnitConditions(prev => prev.filter(conditionId => conditionId !== id));
  };

  const handleAddNewUnitCondition = (name: string) => {
    const newId = `condition-${Date.now()}`;
    const newCondition = { id: newId, name };
    setUnitConditions(prev => [...prev, newCondition]);
    setSelectedUnitConditions(prev => [...prev, newId]);
  };

  // Environment handlers
  const handleSelectEnvironment = (id: string) => {
    setSelectedEnvironments(prev => [...prev, id]);
  };

  const handleRemoveEnvironment = (id: string) => {
    setSelectedEnvironments(prev => prev.filter(envId => envId !== id));
  };

  const handleAddNewEnvironment = (name: string) => {
    const newId = `env-${Date.now()}`;
    const newEnvironment = { id: newId, name };
    setEnvironments(prev => [...prev, newEnvironment]);
    setSelectedEnvironments(prev => [...prev, newId]);
  };

  // Location handlers
  const handleSelectLocation = (id: string) => {
    setSelectedLocations(prev => [...prev, id]);
  };

  const handleRemoveLocation = (id: string) => {
    setSelectedLocations(prev => prev.filter(locId => locId !== id));
  };

  const handleAddNewLocation = (name: string) => {
    const newId = `loc-${Date.now()}`;
    const newLocation = { id: newId, name };
    setLocations(prev => [...prev, newLocation]);
    setSelectedLocations(prev => [...prev, newId]);
  };

  // Handlers for nearby places
  const handleTransitStationChange = (index: number, field: 'name' | 'distance', value: string | number) => {
    const newTransitStations = [...transitStations];
    newTransitStations[index] = {
      ...newTransitStations[index],
      [field]: value
    };
    setTransitStations(newTransitStations);
  };

  const handleAddTransitStation = () => {
    setTransitStations([...transitStations, { name: '', distance: 0 }]);
  };

  const handleRemoveTransitStation = (index: number) => {
    if (transitStations.length > 1) {
      const newTransitStations = [...transitStations];
      newTransitStations.splice(index, 1);
      setTransitStations(newTransitStations);
    }
  };

  const handleHospitalChange = (index: number, field: 'name' | 'distance', value: string | number) => {
    const newHospitals = [...hospitals];
    newHospitals[index] = {
      ...newHospitals[index],
      [field]: value
    };
    setHospitals(newHospitals);
  };

  const handleAddHospital = () => {
    setHospitals([...hospitals, { name: '', distance: 0 }]);
  };

  const handleRemoveHospital = (index: number) => {
    if (hospitals.length > 1) {
      const newHospitals = [...hospitals];
      newHospitals.splice(index, 1);
      setHospitals(newHospitals);
    }
  };

  const handleEducationPlaceChange = (index: number, field: 'name' | 'distance', value: string | number) => {
    const newEducationPlaces = [...educationPlaces];
    newEducationPlaces[index] = {
      ...newEducationPlaces[index],
      [field]: value
    };
    setEducationPlaces(newEducationPlaces);
  };

  const handleAddEducationPlace = () => {
    setEducationPlaces([...educationPlaces, { name: '', distance: 0 }]);
  };

  const handleRemoveEducationPlace = (index: number) => {
    if (educationPlaces.length > 1) {
      const newEducationPlaces = [...educationPlaces];
      newEducationPlaces.splice(index, 1);
      setEducationPlaces(newEducationPlaces);
    }
  };

  const handleMallChange = (index: number, field: 'name' | 'distance', value: string | number) => {
    const newMalls = [...malls];
    newMalls[index] = {
      ...newMalls[index],
      [field]: value
    };
    setMalls(newMalls);
  };

  const handleAddMall = () => {
    setMalls([...malls, { name: '', distance: 0 }]);
  };

  const handleRemoveMall = (index: number) => {
    if (malls.length > 1) {
      const newMalls = [...malls];
      newMalls.splice(index, 1);
      setMalls(newMalls);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Listing Classification */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Listing Classification</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="listing-type" className="font-medium">Listing Type*</Label>
                  <Select>
                    <SelectTrigger id="listing-type" className="h-10">
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <UISelectItem value="normal-list">Normal List</UISelectItem>
                      <UISelectItem value="a-list">A List</UISelectItem>
                      <UISelectItem value="exclusive-list">Exclusive List</UISelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-hook" className="font-medium">Property Hook</Label>
                  <Textarea 
                    id="property-hook" 
                    placeholder="What makes this property special?" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hashtags" className="font-medium">Hashtags</Label>
                  <Input 
                    id="hashtags" 
                    placeholder="Add hashtags separated by commas" 
                    className="h-10" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Comparison */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Market Comparison</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="asking-price-view" className="font-medium">Asking Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="asking-price-view" 
                      readOnly 
                      className="pl-10 h-10 bg-muted/30" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Reflects the asking price from the Price section</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-match" className="font-medium">Last Match</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="last-match" 
                      type="number" 
                      min="0" 
                      placeholder="0" 
                      className="pl-10 h-10" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="percentage-diff" className="font-medium">% Difference</Label>
                  <div className="relative">
                    <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="percentage-diff" 
                      readOnly 
                      className="pl-10 h-10 bg-muted/30" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Calculated from Asking Price / Last Match</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Features */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Property Features</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Giveaways"
                  searchPlaceholder="Search giveaways..."
                  emptyMessage="No giveaways found"
                  items={giveaways}
                  selectedItems={selectedGiveaways}
                  onSelect={handleSelectGiveaway}
                  onRemove={handleRemoveGiveaway}
                  onAddNew={handleAddNewGiveaway}
                  icon={<Gift className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Giveaway"
                />
                
                <MultiSelectSearch
                  label="Unit Condition"
                  searchPlaceholder="Search unit conditions..."
                  emptyMessage="No unit conditions found"
                  items={unitConditions}
                  selectedItems={selectedUnitConditions}
                  onSelect={handleSelectUnitCondition}
                  onRemove={handleRemoveUnitCondition}
                  onAddNew={handleAddNewUnitCondition}
                  icon={<Building className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Condition"
                />
              </div>
              
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Common Areas"
                  searchPlaceholder="Search common areas..."
                  emptyMessage="No common areas found"
                  items={commonAreas}
                  selectedItems={selectedCommonAreas}
                  onSelect={handleSelectCommonArea}
                  onRemove={handleRemoveCommonArea}
                  onAddNew={handleAddNewCommonArea}
                  icon={<Building2 className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Common Area"
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Environment"
                  searchPlaceholder="Search environments..."
                  emptyMessage="No environments found"
                  items={environments}
                  selectedItems={selectedEnvironments}
                  onSelect={handleSelectEnvironment}
                  onRemove={handleRemoveEnvironment}
                  onAddNew={handleAddNewEnvironment}
                  icon={<Map className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Environment"
                />
                
                <MultiSelectSearch
                  label="Location"
                  searchPlaceholder="Search locations..."
                  emptyMessage="No locations found"
                  items={locations}
                  selectedItems={selectedLocations}
                  onSelect={handleSelectLocation}
                  onRemove={handleRemoveLocation}
                  onAddNew={handleAddNewLocation}
                  icon={<MapPin className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Location"
                />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location-remark" className="font-medium">Location Remark</Label>
                  <Textarea 
                    id="location-remark" 
                    placeholder="Notes about the location" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
              </div>
            </div>

            {/* Nearby Transit Stations */}
            <div className="mt-6">
              <Label className="font-medium">Nearby Train Stations + Distance (km)</Label>
              {transitStations.map((station, index) => (
                <div key={index} className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        placeholder="Station name"
                        value={station.name}
                        onChange={(e) => handleTransitStationChange(index, 'name', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="km"
                      value={station.distance}
                      onChange={(e) => handleTransitStationChange(index, 'distance', parseFloat(e.target.value))}
                      className="h-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTransitStation(index)}
                    disabled={transitStations.length === 1}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddTransitStation}
                className="mt-2"
              >
                Add Station
              </Button>
            </div>

            {/* Nearby Hospitals */}
            <div className="mt-6">
              <Label className="font-medium">Nearby Hospitals + Distance (km)</Label>
              {hospitals.map((hospital, index) => (
                <div key={index} className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <Hospital className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        placeholder="Hospital name"
                        value={hospital.name}
                        onChange={(e) => handleHospitalChange(index, 'name', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="km"
                      value={hospital.distance}
                      onChange={(e) => handleHospitalChange(index, 'distance', parseFloat(e.target.value))}
                      className="h-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveHospital(index)}
                    disabled={hospitals.length === 1}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddHospital}
                className="mt-2"
              >
                Add Hospital
              </Button>
            </div>

            {/* Nearby Education Places */}
            <div className="mt-6">
              <Label className="font-medium">Nearby Schools, Colleges + Distance (km)</Label>
              {educationPlaces.map((place, index) => (
                <div key={index} className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <School className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        placeholder="School/college name"
                        value={place.name}
                        onChange={(e) => handleEducationPlaceChange(index, 'name', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="km"
                      value={place.distance}
                      onChange={(e) => handleEducationPlaceChange(index, 'distance', parseFloat(e.target.value))}
                      className="h-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEducationPlace(index)}
                    disabled={educationPlaces.length === 1}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddEducationPlace}
                className="mt-2"
              >
                Add School/College
              </Button>
            </div>

            {/* Nearby Shopping Malls */}
            <div className="mt-6">
              <Label className="font-medium">Nearby Shopping Malls + Distance (km)</Label>
              {malls.map((mall, index) => (
                <div key={index} className="flex items-center gap-3 mt-3">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <ShoppingBag className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        placeholder="Mall name"
                        value={mall.name}
                        onChange={(e) => handleMallChange(index, 'name', e.target.value)}
                        className="h-10"
                      />
                    </div>
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="km"
                      value={mall.distance}
                      onChange={(e) => handleMallChange(index, 'distance', parseFloat(e.target.value))}
                      className="h-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMall(index)}
                    disabled={malls.length === 1}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddMall}
                className="mt-2"
              >
                Add Mall
              </Button>
            </div>
          </div>

          {/* Buyer Profile */}
          <div className="space-y-4">
            <div className="pb-2">
              <h3 className="text-lg font-medium mb-2">Buyer Profile</h3>
              <Separator className="w-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <MultiSelectSearch
                  label="Target Buyer"
                  searchPlaceholder="Search target buyers..."
                  emptyMessage="No target buyers found"
                  items={targetBuyers}
                  selectedItems={selectedTargetBuyers}
                  onSelect={handleSelectTargetBuyer}
                  onRemove={handleRemoveTargetBuyer}
                  onAddNew={handleAddNewTargetBuyer}
                  icon={<Users className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Target Buyer"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="target-buyer-remark" className="font-medium">Target Buyer Remark</Label>
                  <Textarea 
                    id="target-buyer-remark" 
                    placeholder="Notes about potential buyers" 
                    className="resize-none min-h-[80px]" 
                  />
                </div>
                
                <MultiSelectSearch
                  label="Investor Features"
                  searchPlaceholder="Search investor features..."
                  emptyMessage="No investor features found"
                  items={investorFeatures}
                  selectedItems={selectedInvestorFeatures}
                  onSelect={handleSelectInvestorFeature}
                  onRemove={handleRemoveInvestorFeature}
                  onAddNew={handleAddNewInvestorFeature}
                  icon={<Briefcase className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Investor Feature"
                />
              </div>
              
              <div className="space-y-4">
                <MultiSelectSearch
                  label="เหมาะกับผู้ซื้อช่วงอายุใดบ้าง"
                  searchPlaceholder="ค้นหาช่วงอายุ..."
                  emptyMessage="ไม่พบช่วงอายุที่ค้นหา"
                  items={ageRanges}
                  selectedItems={selectedAgeRanges}
                  onSelect={handleSelectAgeRange}
                  onRemove={handleRemoveAgeRange}
                  onAddNew={null}
                  icon={<Clock className="h-10 w-10 text-muted-foreground mb-2" />}
                  badgeLabel="Age Range"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="monthly-payment" className="font-medium">ผ่อนเริ่มต้น</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="monthly-payment" 
                      placeholder="Monthly payment amount" 
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                      className="pl-10 h-10" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-salary" className="font-medium">เงินเดือนผู้ซื้อที่เป็นกลุ่มเป้าหมาย</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input 
                      id="target-salary" 
                      placeholder="Target buyer salary" 
                      value={targetSalary}
                      onChange={(e) => setTargetSalary(e.target.value)}
                      className="pl-10 h-10" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AExclusiveTab; 