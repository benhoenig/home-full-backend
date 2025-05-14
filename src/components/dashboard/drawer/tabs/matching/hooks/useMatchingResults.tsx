
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MatchingResult } from '../MatchingTypes';

export const useMatchingResults = () => {
  const { toast } = useToast();
  
  // Mock state for matches (would be replaced with actual API call)
  const [matchCount, setMatchCount] = useState(0);
  const [showMatches, setShowMatches] = useState(false);
  const [matchingResults, setMatchingResults] = useState<MatchingResult[]>([]);
  
  // Match percentage (50-100%)
  const [matchPercentage, setMatchPercentage] = useState(80);
  
  const handleMatchPercentageChange = (value: number[]) => {
    setMatchPercentage(value[0]);
  };
  
  const handleRefreshMatches = (formState: any) => {
    // In a real application, this would call an API to find matches
    // Mock functionality for now
    const mockCount = Math.floor(Math.random() * 20);
    setMatchCount(mockCount);
    
    // Generate mock results
    const mockResults: MatchingResult[] = Array.from({ length: mockCount }, (_, i) => ({
      id: `listing-${i + 1}`,
      name: `Property ${i + 1}`,
      type: formState.propertyType || 'Condominium',
      location: formState.zone || 'Central Bangkok',
      price: Math.floor((Math.random() * 5) + 5) + 'M',
      bedrooms: Math.floor((Math.random() * 4) + 1),
      matchPercentage: Math.floor((Math.random() * (100 - matchPercentage)) + matchPercentage)
    }));
    
    setMatchingResults(mockResults);
    
    toast({
      title: "Matches Updated",
      description: `Found ${mockCount} properties matching your criteria.`,
    });
  };
  
  return {
    matchCount,
    showMatches,
    setShowMatches,
    matchingResults,
    matchPercentage,
    handleMatchPercentageChange,
    handleRefreshMatches
  };
};
