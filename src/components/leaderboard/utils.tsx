import React from 'react';
import { BarChart, Trophy, Medal, Users, DollarSign, Star, LineChart, ListChecks, Building, Presentation, Book, FileText, Video, Users2, ClipboardCheck } from 'lucide-react';
import { Achiever, LeaderboardType, NewSalesData, NewSalesMetricType } from './data';

// Format time for countdown display
export const formatTime = (timeRemaining: number) => {
  const days = Math.floor(timeRemaining / (24 * 60 * 60));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeRemaining % (60 * 60)) / 60);
  const seconds = timeRemaining % 60;
  
  return { days, hours, minutes, seconds };
};

// Format currency
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
};

// Get metric value based on selected leaderboard type
export const getMetricValue = (achiever: Achiever, type: LeaderboardType) => {
  switch(type) {
    case 'Revenue':
      return formatCurrency(achiever.sales);
    case 'Conversion Rate':
      return `${achiever.conversion}%`;
    case 'Closed Case':
      return achiever.closedCases;
    case 'Avg. Ticket Size':
      return formatCurrency(achiever.ticketSize);
    case 'Avg. Buyer Satisfaction':
      return achiever.buyerSatisfaction.toFixed(1);
    case 'Avg. Owner Satisfaction':
      return achiever.ownerSatisfaction.toFixed(1);
    default:
      return formatCurrency(achiever.sales);
  }
};

// Get icon for metric type
export const getMetricIcon = (type: LeaderboardType): React.ReactNode => {
  switch(type) {
    case 'Revenue':
      return <DollarSign className="h-4 w-4 ml-1" />;
    case 'Conversion Rate':
      return <LineChart className="h-4 w-4 ml-1" />;
    case 'Closed Case':
      return <Users className="h-4 w-4 ml-1" />;
    case 'Avg. Ticket Size':
      return <DollarSign className="h-4 w-4 ml-1" />;
    case 'Avg. Buyer Satisfaction':
    case 'Avg. Owner Satisfaction':
      return <Star className="h-4 w-4 ml-1" />;
    default:
      return <BarChart className="h-4 w-4 ml-1" />;
  }
};

// Get medal color based on rank
export const getMedalColor = (rank: number) => {
  switch(rank) {
    case 1:
      return 'bg-amber-500 text-white';
    case 2:
      return 'bg-gray-400 text-white';
    case 3:
      return 'bg-amber-700 text-white';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

// Get new sales metric value
export const getNewSalesMetricValue = (data: NewSalesData, type: NewSalesMetricType) => {
  switch(type) {
    case 'New List (Count)':
      return data.newList;
    case 'Owner Visit (Count)':
      return data.ownerVisit;
    case 'Consult 2% (Count)':
      return data.consult2;
    case 'Consult 5% (Count)':
      return data.consult5;
    case 'Survey (Count)':
      return data.survey;
    case 'Present Project (Count)':
      return data.presentProject;
    case 'A List (Count)':
      return data.aList;
    case 'Owner Script (Percentage)':
      return `${data.ownerScript}%`;
    case 'Consulting Script (Percentage)':
      return `${data.consultingScript}%`;
    case 'Buyer Script (Percentage)':
      return `${data.buyerScript}%`;
    case 'HOME Academy Video Watched (Count)':
      return data.academyVideo;
    case 'Real Case with Senior (Count)':
      return data.realCase;
    default:
      return data.newList;
  }
};

// Get icon for new sales metric type
export const getNewSalesMetricIcon = (type: NewSalesMetricType): React.ReactNode => {
  switch(type) {
    case 'New List (Count)':
      return <ListChecks className="h-4 w-4" />;
    case 'Owner Visit (Count)':
      return <Building className="h-4 w-4" />;
    case 'Consult 2% (Count)':
    case 'Consult 5% (Count)':
      return <Users className="h-4 w-4" />;
    case 'Survey (Count)':
      return <ClipboardCheck className="h-4 w-4" />;
    case 'Present Project (Count)':
      return <Presentation className="h-4 w-4" />;
    case 'A List (Count)':
      return <Book className="h-4 w-4" />;
    case 'Owner Script (Percentage)':
    case 'Consulting Script (Percentage)':
    case 'Buyer Script (Percentage)':
      return <FileText className="h-4 w-4" />;
    case 'HOME Academy Video Watched (Count)':
      return <Video className="h-4 w-4" />;
    case 'Real Case with Senior (Count)':
      return <Users2 className="h-4 w-4" />;
    default:
      return <LineChart className="h-4 w-4" />;
  }
};

// Get target value for new sales metrics
export const getNewSalesTarget = (metricType: NewSalesMetricType): number => {
  if (metricType.includes('Percentage')) {
    return 100;
  }
  
  switch(metricType) {
    case 'New List (Count)':
      return 15;
    case 'Owner Visit (Count)':
      return 10;
    case 'Consult 2% (Count)':
    case 'Consult 5% (Count)':
      return 8;
    case 'Survey (Count)':
      return 6;
    case 'Present Project (Count)':
      return 10;
    case 'A List (Count)':
      return 5;
    case 'HOME Academy Video Watched (Count)':
      return 15;
    case 'Real Case with Senior (Count)':
      return 3;
    default:
      return 10;
  }
};

// Format value based on leaderboard type for display
export const formatValue = (value: number | string, type: LeaderboardType, compact: boolean = false): string => {
  // If value is already a string, just return it
  if (typeof value === 'string') return value;

  switch(type) {
    case 'Revenue':
    case 'Avg. Ticket Size':
      if (compact) {
        return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : `${value}`;
      }
      return formatCurrency(value);
    case 'Conversion Rate':
      return `${value}%`;
    case 'Avg. Buyer Satisfaction':
    case 'Avg. Owner Satisfaction':
      return value.toFixed(1);
    case 'Closed Case':
    default:
      return value.toString();
  }
}; 