import React, { useState, useEffect } from 'react';
import { PlusIcon, TargetIcon, XIcon, ClipboardCheckIcon, CheckIcon, InfoIcon, CalendarIcon, HistoryIcon, ActivityIcon, HomeIcon, UserIcon, ShoppingCartIcon, MegaphoneIcon, ChevronUp, HeartIcon, Star, Search, UploadCloud, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import ProgressBar from './drawer/SalesProgressBar';
import { useIsMobile } from '@/hooks/use-mobile';
import AddListingModal from './listings-table/AddListingModal';
import { useListingsTableData, Listing } from '@/hooks/useListingsTableData';
import ListingDetailsDrawer from './ListingDetailsDrawer';
import { useLeadsTableData, Lead } from '@/hooks/useLeadsTableData';
import LeadDetailsDrawer from './LeadDetailsDrawer';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define action metadata
export type ActionType = {
  id: string;
  name: string;
  points: number;
  description: string;
  category: 'product' | 'owner' | 'buyer' | 'marketing' | 'personal';
  isAutomated: boolean;
  isFavorite?: boolean; // Track if action is favorited
};

// Action categories and details organized by group
const actionTypes: ActionType[] = [
  // Product
  { id: 'survey', name: 'Survey', points: 20, description: 'Property survey completed', category: 'product', isAutomated: true },
  { id: 'lastMatch', name: 'Last Match', points: 25, description: 'Final property matching', category: 'product', isAutomated: true },
  
  // Owner
  { id: 'newList', name: 'New List', points: 5, description: 'New property listing', category: 'owner', isAutomated: true },
  { id: 'consult2', name: 'Consult', points: 15, description: 'Consultation with owner', category: 'owner', isAutomated: true },
  { id: 'consultRent', name: 'Consult (Rent Case)', points: 10, description: 'Rental consultation', category: 'owner', isAutomated: true },
  { id: 'ownerVisit', name: 'Owner Visit', points: 15, description: 'Property owner visit', category: 'owner', isAutomated: true },
  
  // Buyer
  { id: 'clientData', name: 'Client Data', points: 10, description: 'Client data completed', category: 'buyer', isAutomated: true },
  { id: 'following', name: 'Following', points: 2.5, description: 'Following up with client', category: 'buyer', isAutomated: true },
  { id: 'appointment', name: 'Appointment', points: 20, description: 'Client appointment scheduled', category: 'buyer', isAutomated: true },
  { id: 'showing', name: 'Showing', points: 30, description: 'Property showing completed', category: 'buyer', isAutomated: true },
  { id: 'negotiate', name: 'Negotiate', points: 1, description: 'Price negotiation', category: 'buyer', isAutomated: true },
  { id: 'closedRent', name: 'Closed (Rent Case)', points: 60, description: 'Rental case closed', category: 'buyer', isAutomated: true },
  { id: 'closedSell5M', name: 'Closed (Sell <5M)', points: 180, description: 'Sale closed under 5M', category: 'buyer', isAutomated: true },
  { id: 'closedSell10M', name: 'Closed (Sell 5-10M)', points: 250, description: 'Sale closed between 5-10M', category: 'buyer', isAutomated: true },
  { id: 'closedSell10M+', name: 'Closed (Sell 10M+)', points: 350, description: 'Sale closed over 10M', category: 'buyer', isAutomated: true },
  { id: 'giftReview', name: 'Gift + Review', points: 50, description: 'Gift sent and review received', category: 'buyer', isAutomated: true },
  
  // Marketing
  { id: 'sign', name: 'Sign', points: 50, description: 'Property sign installed', category: 'marketing', isAutomated: false },
  { id: 'reel', name: 'Reel', points: 50, description: 'Social media reel created', category: 'marketing', isAutomated: false },
  { id: 'hometour', name: 'Hometour', points: 120, description: 'Home tour video created', category: 'marketing', isAutomated: false },
  { id: 'exclusive', name: 'Exclusive', points: 200, description: 'Exclusive listing agreement', category: 'marketing', isAutomated: false },
  
  // Personal
  { id: 'presentProject', name: 'Present Project', points: 10, description: 'Practice presentation skills', category: 'personal', isAutomated: false },
  { id: 'ownerScript', name: 'Owner Script', points: 15, description: 'Improve owner communication', category: 'personal', isAutomated: false },
  { id: 'consultingScript', name: 'Consulting Script', points: 15, description: 'Develop consulting expertise', category: 'personal', isAutomated: false },
  { id: 'buyerScript', name: 'Buyer Script', points: 15, description: 'Enhance buyer interactions', category: 'personal', isAutomated: false },
  { id: 'homeAcademyLive', name: 'HOME Academy (Live)', points: 30, description: 'Attend in-person training', category: 'personal', isAutomated: false },
  { id: 'homeAcademyOnline', name: 'HOME Academy (Online)', points: 20, description: 'Complete online training course', category: 'personal', isAutomated: false },
  { id: 'homeAcademyVideo', name: 'HOME Academy (Video)', points: 15, description: 'Watch training video', category: 'personal', isAutomated: false },
  { id: 'realCaseSenior', name: 'Real Case with Senior', points: 40, description: 'Learn from experienced agent', category: 'personal', isAutomated: false },
];

// Mock data for the currently logged actions
const mockLoggedActions = [
  { id: '1', actionTypeId: 'survey', date: '2023-06-15', notes: 'Completed survey for 123 Main St' },
  { id: '2', actionTypeId: 'newList', date: '2023-06-16', notes: 'Added new listing for 456 Oak Ave' },
  { id: '3', actionTypeId: 'ownerVisit', date: '2023-06-17', notes: 'Met with owner of 789 Pine Blvd' },
  { id: '4', actionTypeId: 'sign', date: '2023-06-18', notes: 'Installed sign at 123 Main St' },
];

type ActionTrackerFABProps = {
  // Optional callback when an action is logged
  onActionLogged?: (actionType: ActionType) => void;
  // Pass current user progress to display
  currentMonthPoints?: number;
  targetMonthPoints?: number;
};

// Define the script evaluation data type
type ScriptEvaluationData = {
  wording: number;
  tonality: number;
  rapport: number;
  averageScore: number;
  attachment?: File | null;
  remark: string;
};

const ActionTrackerFAB: React.FC<ActionTrackerFABProps> = ({ 
  onActionLogged,
  currentMonthPoints = 1250,
  targetMonthPoints = 3000
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'log' | 'history'>('log');
  const [selectedCategory, setSelectedCategory] = useState<'product' | 'owner' | 'buyer' | 'marketing' | 'personal' | null>(null);
  
  // State for favorite actions
  const [favoriteActions, setFavoriteActions] = useState<string[]>([
    'appointment', 'newList', 'sign' // Default favorites
  ]);
  
  // Add state for AddListingModal
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  // Add state to track which tab should be active in the modal
  const [activeModalTab, setActiveModalTab] = useState<string>('basic-info');
  
  // State for listing selection view
  const [isListingSelectionView, setIsListingSelectionView] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedActionType, setSelectedActionType] = useState<ActionType | null>(null);
  const [listingSearchTerm, setListingSearchTerm] = useState('');
  
  // State for LeadDetailsDrawer
  const [isLeadDetailsDrawerOpen, setIsLeadDetailsDrawerOpen] = useState(false);
  const [selectedLeadDetailsTab, setSelectedLeadDetailsTab] = useState<'details' | 'activity'>('details');
  
  // State for lead selection view
  const [isLeadSelectionView, setIsLeadSelectionView] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadSearchTerm, setLeadSearchTerm] = useState('');
  
  // State for ListingDetailsDrawer
  const [isListingDetailsDrawerOpen, setIsListingDetailsDrawerOpen] = useState(false);
  const [listingDetailsDrawerActiveTab, setListingDetailsDrawerActiveTab] = useState<'details' | 'photo' | 'location' | 'aexclusive' | 'activity'>('details');
  
  // State for Script Evaluation
  const [isScriptEvaluationView, setIsScriptEvaluationView] = useState(false);
  const [selectedScriptType, setSelectedScriptType] = useState<'Owner Script' | 'Consulting Script' | 'Buyer Script'>('Owner Script');
  
  // State for Academy Learning
  const [isAcademyLearningView, setIsAcademyLearningView] = useState(false);
  const [selectedAcademyType, setSelectedAcademyType] = useState<'HOME Academy (Live)' | 'HOME Academy (Online)' | 'HOME Academy (Video)'>('HOME Academy (Live)');
  const [lessonName, setLessonName] = useState('');
  const [lessonDateTime, setLessonDateTime] = useState('');
  const [lessonsLearned, setLessonsLearned] = useState('');
  
  // State for Real Case with Senior
  const [isRealCaseView, setIsRealCaseView] = useState(false);
  const [seniorName, setSeniorName] = useState('');
  const [caseDateTime, setCaseDateTime] = useState('');
  const [caseType, setCaseType] = useState('Survey');
  const [caseLesson, setCaseLesson] = useState('');
  
  // State for Present Project
  const [isPresentProjectView, setIsPresentProjectView] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [isAddingNewProject, setIsAddingNewProject] = useState(false);
  const [presentationDateTime, setPresentationDateTime] = useState('');
  const [presentationNotes, setPresentationNotes] = useState('');
  
  // State for Survey
  const [isSurveyView, setIsSurveyView] = useState(false);
  const [surveyPropertyType, setSurveyPropertyType] = useState<'Condo' | 'House'>('Condo');
  const [surveyFormData, setSurveyFormData] = useState<Record<string, string>>({});
  
  // Condo Survey Form Fields
  const condoSurveyFields = [
    { id: 'projectName', label: 'ชื่อโครงการ', required: true },
    { id: 'developer', label: 'Developer', required: true },
    { id: 'unitCount', label: 'จำนวนยูนิต', required: true },
    { id: 'floorCount', label: 'จำนวนชั้น', required: true },
    { id: 'propertyType', label: 'ประเภท Type', required: true },
    { id: 'projectAge', label: 'อายุโครงการกี่ปี', required: true },
    { id: 'commonAreas', label: 'ส่วนกลางมีอะไรบ้าง', required: true },
    { id: 'commonFee', label: 'ค่าส่วนกลาง / จ่ายยังไง', required: true },
    { id: 'juristic', label: 'นิติบุคคล', required: true },
    { id: 'juristicFeePercent', label: 'นิติบุคคลเก็บส่วนกลางได้กี่%', required: true },
    { id: 'parkingPercent', label: 'ที่จอดรถกี่ %', required: true },
    { id: 'extraParkingFee', label: 'หากมีมากกว่าสิทธิ์จอดรถของตนเอง คันต่อไปค่าเช่าที่จอดรถเดือนละเท่าไหร่', required: false },
    { id: 'parkingIssue', label: 'มีปัญหาที่จอดรถไม่เพียงพอไหม', required: false },
    { id: 'parkingSolution', label: 'ถ้ามีแก้ปัญหาอย่างไร', required: false },
    { id: 'finalPrice', label: 'ราคาจบของโครงการ', required: true },
    { id: 'rentalPrice', label: 'ราคาปล่อยเช่าในโครงการ', required: true },
    { id: 'tenantNationality', label: 'ผู้เช่าเป็นประเทศอะไร', required: false },
    { id: 'occupancyRate', label: 'คนพักอาศัยเกิน 80% ไหม', required: false },
    { id: 'foreignQuotaRemaining', label: 'มีโควต้าต่างชาติเหลืออีกกี่ %', required: false },
    { id: 'residentOccupation', label: 'อาชีพลูกบ้าน', required: false },
    { id: 'debtClearanceCertFrequency', label: 'การขอใบปลอดหนี้ มีเยอะไหม', required: false },
    { id: 'debtClearanceCertTime', label: 'ในการขอใบปลอดหนี้ ใช้เวลาเท่าไหร่', required: false },
    { id: 'pros', label: 'ข้อดี', required: true, textArea: true },
    { id: 'cons', label: 'ข้อเสีย', required: true, textArea: true }
  ];
  
  // House Survey Form Fields
  const houseSurveyFields = [
    { id: 'projectName', label: 'ชื่อโครงการ', required: true },
    { id: 'unitCount', label: 'จำนวนยูนิต', required: true },
    { id: 'propertyType', label: 'ประเภท Type', required: true },
    { id: 'projectAge', label: 'อายุโครงการกี่ปี', required: true },
    { id: 'commonAreas', label: 'ส่วนกลางมีอะไรบ้าง', required: true },
    { id: 'commonFee', label: 'ค่าส่วนกลาง / จ่ายยังไง', required: true },
    { id: 'juristic', label: 'นิติบุคคล', required: true },
    { id: 'juristicFeePercent', label: 'นิติบุคคลเก็บส่วนกลางได้กี่%', required: true },
    { id: 'parkingInfo', label: 'เจอดได้กี่คัน ถ้าเกินต้องเสียคันละเท่าไหร่', required: true },
    { id: 'finalPrice', label: 'ราคาจบของโครงการ', required: true },
    { id: 'rentalPrice', label: 'ราคาปล่อยเช่าในโครงการ', required: true },
    { id: 'renovatedHomes', label: 'มีบ้านรีโนเวทขายไหม', required: false },
    { id: 'flooding', label: 'น้ำท่วมขังไหม', required: false },
    { id: 'residentOccupation', label: 'อาชีพลูกบ้าน', required: false },
    { id: 'pros', label: 'ข้อดี', required: true, textArea: true },
    { id: 'cons', label: 'ข้อเสีย', required: true, textArea: true }
  ];
  
  // Sample data for senior agents (would come from API/database in real app)
  const seniorAgents = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Chen' },
    { id: '3', name: 'David Rodriguez' },
    { id: '4', name: 'Emma Thompson' },
    { id: '5', name: 'James Wilson' },
    { id: '6', name: 'Olivia Parker' },
    { id: '7', name: 'William Lee' },
  ];
  
  // Sample data for projects (would come from API/database in real app)
  const projectsData = [
    { id: '1', name: 'Downtown Lofts' },
    { id: '2', name: 'Riverside Condos' },
    { id: '3', name: 'Parkview Heights' },
    { id: '4', name: 'Mountain View' },
    { id: '5', name: 'Ocean Breeze' },
    { id: '6', name: 'Golden Hills' },
    { id: '7', name: 'Silver Lake' },
  ];
  
  // Script evaluation form state
  const [wording, setWording] = useState<number>(0);
  const [tonality, setTonality] = useState<number>(0);
  const [rapport, setRapport] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [remark, setRemark] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');
  
  // Calculate average score whenever individual scores change
  useEffect(() => {
    const newAverage = (wording + tonality + rapport) / 3;
    setAverageScore(Math.round(newAverage));
  }, [wording, tonality, rapport]);
  
  // Reset script evaluation form
  const resetScriptEvaluationForm = () => {
    setWording(0);
    setTonality(0);
    setRapport(0);
    setAttachment(null);
    setAttachmentName('');
    setRemark('');
  };
  
  // Reset Academy form
  const resetAcademyForm = () => {
    setLessonName('');
    setLessonDateTime('');
    setLessonsLearned('');
  };
  
  // Reset Real Case form
  const resetRealCaseForm = () => {
    setSeniorName('');
    setCaseDateTime('');
    setCaseType('Survey');
    setCaseLesson('');
  };
  
  // Reset Present Project form
  const resetPresentProjectForm = () => {
    setSelectedProject('');
    setNewProjectName('');
    setIsAddingNewProject(false);
    setPresentationDateTime('');
    setPresentationNotes('');
  };
  
  // Reset Survey form
  const resetSurveyForm = () => {
    setSurveyPropertyType('Condo');
    setSurveyFormData({});
  };
  
  // Move the hook calls to the top level of the component
  const listingsData = useListingsTableData();
  const leadsData = useLeadsTableData();
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentMonthPoints / targetMonthPoints) * 100);
  const remainingPoints = targetMonthPoints - currentMonthPoints;
  
  // Calculate month timeline progress
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysPassed = today.getDate();
  const monthProgressPercentage = (daysPassed / daysInMonth) * 100;
  
  // Calculate if user is ahead or behind pace
  const expectedPoints = Math.round((daysPassed / daysInMonth) * targetMonthPoints);
  const pointsDifference = currentMonthPoints - expectedPoints;
  const isAheadOfPace = pointsDifference >= 0;
  
  // Function to select a category
  const selectCategory = (category: 'product' | 'owner' | 'buyer' | 'marketing' | 'personal') => {
    setSelectedCategory(category);
  };
  
  // Function to go back to categories
  const backToCategories = () => {
    setSelectedCategory(null);
  };
  
  // Function to toggle favorite status of an action
  const toggleFavorite = (actionId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the parent onClick
    
    setFavoriteActions(prev => {
      if (prev.includes(actionId)) {
        // Remove from favorites
        toast({
          title: "Removed from favorites",
          description: "Action removed from your favorites list",
        });
        return prev.filter(id => id !== actionId);
      } else {
        // Add to favorites
        toast({
          title: "Added to favorites",
          description: "Action added to your favorites list",
        });
        return [...prev, actionId];
      }
    });
  };
  
  // Function to handle listing submission from modal
  const handleSubmitListing = (data: any) => {
    console.log('New listing data:', data);
    setIsAddListingModalOpen(false);
    
    // Get the newList action
    const newListAction = actionTypes.find(action => action.id === 'newList');
    
    if (newListAction) {
      // Notify the user
      toast({
        title: "Action Logged",
        description: `${newListAction.name} (+${newListAction.points} points)`,
      });
      
      // Call the callback if provided
      if (onActionLogged) {
        onActionLogged(newListAction);
      }
    }
  };
  
  // Modified function to handle action clicks
  const handleActionClick = (action: ActionType) => {
    // Special case for script evaluation actions
    if (action.id === 'ownerScript' || action.id === 'consultingScript' || action.id === 'buyerScript') {
      // Set the script type based on the action ID
      if (action.id === 'ownerScript') {
        setSelectedScriptType('Owner Script');
      } else if (action.id === 'consultingScript') {
        setSelectedScriptType('Consulting Script');
      } else {
        setSelectedScriptType('Buyer Script');
      }
      
      // Reset the form
      resetScriptEvaluationForm();
      
      // Open the script evaluation view
      setIsScriptEvaluationView(true);
      setSelectedActionType(action);
      
      return;
    }
    
    // Special case for HOME Academy actions
    if (action.id === 'homeAcademyLive' || action.id === 'homeAcademyOnline' || action.id === 'homeAcademyVideo') {
      // Set the academy type based on the action ID
      if (action.id === 'homeAcademyLive') {
        setSelectedAcademyType('HOME Academy (Live)');
      } else if (action.id === 'homeAcademyOnline') {
        setSelectedAcademyType('HOME Academy (Online)');
      } else {
        setSelectedAcademyType('HOME Academy (Video)');
      }
      
      // Reset the form
      resetAcademyForm();
      
      // Set current date/time as default
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setLessonDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
      
      // Open the academy learning view
      setIsAcademyLearningView(true);
      setSelectedActionType(action);
      
      return;
    }
    
    // Special case for Present Project action
    if (action.id === 'presentProject') {
      // Reset the form
      resetPresentProjectForm();
      
      // Set current date/time as default
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setPresentationDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
      
      // Open the present project view
      setIsPresentProjectView(true);
      setSelectedActionType(action);
      
      return;
    }
    
    // Special case for Survey action
    if (action.id === 'survey') {
      // Reset the form
      resetSurveyForm();
      
      // Open the survey view
      setIsSurveyView(true);
      setSelectedActionType(action);
      
      return;
    }
    
    // Special case for Real Case with Senior action
    if (action.id === 'realCaseSenior') {
      // Reset the form
      resetRealCaseForm();
      
      // Set current date/time as default
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCaseDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
      
      // Open the real case view
      setIsRealCaseView(true);
      setSelectedActionType(action);
      
      return;
    }
    
    // Special case for 'newList' action - open the AddListingModal
    if (action.id === 'newList') {
      setActiveModalTab('basic-info');
      setIsAddListingModalOpen(true);
      setIsOpen(false); // Close the FAB panel
      return;
    }
    
    // Special case for 'consult2' action - show listing selection view
    if (action.id === 'consult2') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // Special case for 'consultRent' action - show rental listing selection view
    if (action.id === 'consultRent') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // Special case for 'ownerVisit' action - show listing selection for owner visit
    if (action.id === 'ownerVisit') {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // Special cases for Buyer category actions - show lead selection
    if (
      action.id === 'clientData' || 
      action.id === 'following' || 
      action.id === 'appointment' || 
      action.id === 'showing' || 
      action.id === 'negotiate' || 
      action.id === 'closedRent' || 
      action.id === 'closedSell5M' || 
      action.id === 'closedSell10M' || 
      action.id === 'closedSell10M+' || 
      action.id === 'giftReview'
    ) {
      setSelectedActionType(action);
      setIsLeadSelectionView(true);
      setSelectedLead(null); // Reset selected lead
      setLeadSearchTerm(''); // Reset search term
      return;
    }
    
    // Special cases for Marketing category actions - show listing selection
    if (
      action.id === 'sign' || 
      action.id === 'reel' || 
      action.id === 'hometour' || 
      action.id === 'exclusive'
    ) {
      setSelectedActionType(action);
      setIsListingSelectionView(true);
      setSelectedListing(null); // Reset selected listing
      setListingSearchTerm(''); // Reset search term
      return;
    }
    
    // For all other actions, log them directly without confirmation
    console.log(`Logging action: ${action.name}`);
    
    // Notify the user
    toast({
      title: "Action Logged",
      description: `${action.name} (+${action.points} pts)`,
    });
    
    // Call the callback if provided
    if (onActionLogged) {
      onActionLogged(action);
    }
    
    // Close the panel
    setIsOpen(false);
  };
  
  // New function to handle proceeding with the selected listing
  const handleProceedWithListing = () => {
    if (!selectedListing || !selectedActionType) return;
    
    // Different behavior based on action category
    if (selectedActionType.id === 'ownerVisit') {
      // For Owner Visit, open the ListingDetailsDrawer with activity tab
      setIsListingSelectionView(false);
      setIsOpen(false); // Close the FAB panel
      setListingDetailsDrawerActiveTab('activity');
      setIsListingDetailsDrawerOpen(true);
      
      // Log the action
      console.log(`Navigating to activity tab for Owner Visit on listing ${selectedListing.listingCode}`);
      
      // Notify the user with guidance
      toast({
        title: "Owner Visit Selected",
        description: `Please add a comment about your visit to ${selectedListing.listingName} with the Owner Visit tag`,
      });
      
      // Add a second toast with more detailed instructions after a short delay
      setTimeout(() => {
        toast({
          title: "Action Logging Instructions",
          description: "Use the comment box below the timeline to add details about your owner visit. Be sure to select the 'Owner Visit' tag.",
        });
      }, 1500);
      
      // Call the callback if provided
      if (onActionLogged) {
        onActionLogged(selectedActionType);
      }
    } else if (selectedActionType.category === 'marketing') {
      // For Marketing actions, just log the action directly
      setIsListingSelectionView(false);
      setIsOpen(false); // Close the FAB panel
      
      // Log the action
      console.log(`Logging ${selectedActionType.name} action for listing ${selectedListing.listingCode}`);
      
      // Notify the user
      toast({
        title: "Marketing Action Logged",
        description: `${selectedActionType.name} for ${selectedListing.listingName} (+${selectedActionType.points} points)`,
      });
      
      // Call the callback if provided
      if (onActionLogged) {
        onActionLogged(selectedActionType);
      }
    } else {
      // For other actions (like consult2, consultRent), open the edit modal
      setIsListingSelectionView(false);
      setIsOpen(false); // Close the FAB panel
      
      // Open the edit listing modal with the price tab
      setActiveModalTab('price');
      setIsAddListingModalOpen(true);
      
      // Log the action
      console.log(`Logging ${selectedActionType.name} action for listing ${selectedListing.listingCode}`);
      
      // Notify the user
      toast({
        title: "Listing Selected",
        description: `Editing ${selectedListing.listingName} (${selectedListing.listingCode})`,
      });
    }
  };
  
  // New function to handle proceeding with the selected lead
  const handleProceedWithLead = () => {
    if (!selectedLead || !selectedActionType) return;
    
    // Close the lead selection view and FAB panel
    setIsLeadSelectionView(false);
    setIsOpen(false);
    
    // Determine which tab to open based on the action type
    if (selectedActionType.id === 'clientData') {
      // For Client Data action, open details tab
      setSelectedLeadDetailsTab('details');
    } else {
      // For all other buyer actions, open activity tab
      setSelectedLeadDetailsTab('activity');
    }
    
    // Open the lead details drawer
    setIsLeadDetailsDrawerOpen(true);
    
    // Log the action
    console.log(`Navigating to ${selectedLeadDetailsTab} tab for ${selectedActionType.name} on lead ${selectedLead.name}`);
    
    // Notify the user with guidance
    toast({
      title: `${selectedActionType.name} Selected`,
      description: `Working with lead: ${selectedLead.name}`,
    });
    
    // For activity tab actions, add a second toast with more detailed instructions
    if (selectedActionType.id !== 'clientData') {
      setTimeout(() => {
        toast({
          title: "Action Logging Instructions",
          description: `Please add a comment about this ${selectedActionType.name} action in the comment box below the timeline.`,
        });
      }, 1500);
    }
    
    // Call the callback if provided
    if (onActionLogged) {
      onActionLogged(selectedActionType);
    }
  };
  
  // Function to go back from listing selection to categories
  const backFromListingSelection = () => {
    setIsListingSelectionView(false);
    setSelectedActionType(null);
    setSelectedListing(null);
  };
  
  // Function to go back from lead selection to categories
  const backFromLeadSelection = () => {
    setIsLeadSelectionView(false);
    setSelectedActionType(null);
    setSelectedLead(null);
  };
  
  // Helper function to get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'product': return <HomeIcon className="h-5 w-5" />;
      case 'owner': return <UserIcon className="h-5 w-5" />;
      case 'buyer': return <ShoppingCartIcon className="h-5 w-5" />;
      case 'marketing': return <MegaphoneIcon className="h-5 w-5" />;
      case 'personal': return <HeartIcon className="h-5 w-5" />;
      default: return <ActivityIcon className="h-5 w-5" />;
    }
  };
  
  // Helper function to get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'product': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'owner': return 'bg-green-100 text-green-800 border-green-200';
      case 'buyer': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'marketing': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'personal': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Script evaluation form handlers
  const handleWordingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setWording(value);
  };
  
  const handleTonalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setTonality(value);
  };
  
  const handleRapportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
    setRapport(value);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment(file);
      setAttachmentName(file.name);
    }
  };
  
  const handleRemoveFile = () => {
    setAttachment(null);
    setAttachmentName('');
  };
  
  const handleScriptEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const scriptData: ScriptEvaluationData = {
      wording,
      tonality,
      rapport,
      averageScore,
      attachment,
      remark
    };
    
    console.log('Script evaluation submitted:', scriptData);
    
    // Show success message
    toast({
      title: "Evaluation Submitted",
      description: `${selectedScriptType} evaluation recorded with score: ${averageScore}%`,
    });
    
    // Call the callback if provided
    if (onActionLogged && selectedActionType) {
      onActionLogged(selectedActionType);
    }
    
    // Reset form and close panel
    resetScriptEvaluationForm();
    setIsScriptEvaluationView(false);
    setIsOpen(false);
  };
  
  // Function to go back from script evaluation to categories
  const backFromScriptEvaluation = () => {
    setIsScriptEvaluationView(false);
    setSelectedActionType(null);
    resetScriptEvaluationForm();
  };
  
  // Helper function to get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to handle academy learning form submission
  const handleAcademySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const academyData = {
      type: selectedAcademyType,
      lessonName,
      lessonDateTime,
      lessonsLearned
    };
    
    console.log('Academy learning submitted:', academyData);
    
    // Show success message
    toast({
      title: "Learning Recorded",
      description: `${selectedAcademyType} session "${lessonName}" has been logged`,
    });
    
    // Call the callback if provided
    if (onActionLogged && selectedActionType) {
      onActionLogged(selectedActionType);
    }
    
    // Reset form and close panel
    resetAcademyForm();
    setIsAcademyLearningView(false);
    setIsOpen(false);
  };
  
  // Function to go back from academy learning to categories
  const backFromAcademy = () => {
    setIsAcademyLearningView(false);
    setSelectedActionType(null);
    resetAcademyForm();
  };
  
  // Function to go back from real case to categories
  const backFromRealCase = () => {
    setIsRealCaseView(false);
    setSelectedActionType(null);
    resetRealCaseForm();
  };
  
  // Function to handle real case form submission
  const handleRealCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const realCaseData = {
      seniorName,
      caseDateTime,
      caseType,
      caseLesson
    };
    
    console.log('Real case with senior submitted:', realCaseData);
    
    // Show success message
    toast({
      title: "Case Experience Recorded",
      description: `${caseType} case with ${seniorName} has been logged`,
    });
    
    // Call the callback if provided
    if (onActionLogged && selectedActionType) {
      onActionLogged(selectedActionType);
    }
    
    // Reset form and close panel
    resetRealCaseForm();
    setIsRealCaseView(false);
    setIsOpen(false);
  };
  
  // Function to handle present project form submission
  const handlePresentProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine the final project name (either selected from dropdown or new entry)
    const finalProjectName = isAddingNewProject ? newProjectName : selectedProject;
    
    const projectData = {
      projectName: finalProjectName,
      presentationDateTime,
      presentationNotes
    };
    
    console.log('Project presentation submitted:', projectData);
    
    // Show success message
    toast({
      title: "Project Presentation Recorded",
      description: `Presentation for "${finalProjectName}" has been logged`,
    });
    
    // Call the callback if provided
    if (onActionLogged && selectedActionType) {
      onActionLogged(selectedActionType);
    }
    
    // Reset form and close panel
    resetPresentProjectForm();
    setIsPresentProjectView(false);
    setIsOpen(false);
  };
  
  // Function to handle survey form submission
  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const surveyData = {
      propertyType: surveyPropertyType,
      ...surveyFormData
    };
    
    console.log('Survey submitted:', surveyData);
    
    // Show success message
    toast({
      title: "Survey Recorded",
      description: `Survey for ${surveyFormData.projectName || 'project'} (${surveyPropertyType}) has been logged`,
    });
    
    // Call the callback if provided
    if (onActionLogged && selectedActionType) {
      onActionLogged(selectedActionType);
    }
    
    // Reset form and close panel
    resetSurveyForm();
    setIsSurveyView(false);
    setIsOpen(false);
  };
  
  // Function to go back from present project to categories
  const backFromPresentProject = () => {
    setIsPresentProjectView(false);
    setSelectedActionType(null);
    resetPresentProjectForm();
  };
  
  // Function to go back from survey to categories
  const backFromSurvey = () => {
    setIsSurveyView(false);
    setSelectedActionType(null);
    resetSurveyForm();
  };
  
  // Function to handle survey form field changes
  const handleSurveyFieldChange = (fieldId: string, value: string) => {
    setSurveyFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };
  
  // Shared content for both mobile and desktop
  const actionTrackerContent = (
    <div className="flex flex-col h-full">
      {/* Header - fixed */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center">
          <TargetIcon className="h-5 w-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Action Tracker</h3>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 rounded-full"
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Monthly Progress Section */}
        <div className="px-6 py-3 border-b">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Points Progress</span>
            <span className="text-sm font-semibold text-teal-600">
              {currentMonthPoints} / {targetMonthPoints} pts
            </span>
          </div>
          <ProgressBar 
            value={progressPercentage} 
            color="teal" 
            showLabels={true} 
            startLabel="0" 
            endLabel={`Target: ${targetMonthPoints} pts`}
          />
          
          {/* Month Timeline Progress */}
          <div className="mt-3 mb-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Month Timeline</span>
              <span className="text-sm font-medium text-slate-600">
                Day {daysPassed} of {daysInMonth}
              </span>
            </div>
            <ProgressBar 
              value={monthProgressPercentage} 
                color="rose" 
              showLabels={false}
            />
            
            {/* Pace Indicator */}
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <Badge 
                    className={`text-xs ${isAheadOfPace ? 'bg-teal-100 text-teal-700' : 'bg-rose-100 text-rose-700'} border-none`}
                >
                  {isAheadOfPace ? 'Ahead of pace' : 'Behind pace'}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">
                {isAheadOfPace 
                  ? `+${pointsDifference} pts ahead of target` 
                  : `${Math.abs(pointsDifference)} pts behind target`}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content - either listing/lead selection, script evaluation, or normal action tabs */}
        {isListingSelectionView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromListingSelection}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <ClipboardCheckIcon className="h-5 w-5 mr-2 text-primary" />
                {selectedActionType ? 
                  selectedActionType.category === 'marketing' 
                    ? `Select Listing for "${selectedActionType.name}" Action` 
                    : `Select Listing for ${selectedActionType.name}` 
                  : 'Select Listing'}
              </h4>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search listings by code, name, or owner..."
                  value={listingSearchTerm}
                  onChange={(e) => setListingSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please select which listing you want to perform this action on
              </p>
              {selectedActionType && selectedActionType.category === 'marketing' && (
                <p className="text-sm text-primary/80 mt-1">
                  This action will be completed immediately after selecting a listing
                </p>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto border rounded-md">
              {(() => {
                // Filter listings based on search term
                const filteredListings = listingSearchTerm.trim() === ''
                  ? listingsData
                  : listingsData.filter(listing => 
                      listing.listingCode.toLowerCase().includes(listingSearchTerm.toLowerCase()) ||
                      listing.listingName.toLowerCase().includes(listingSearchTerm.toLowerCase()) ||
                      listing.ownerName.toLowerCase().includes(listingSearchTerm.toLowerCase())
                    );
                
                // Further filter based on action type - only show rental listings for consultRent
                const actionTypeFilteredListings = selectedActionType?.id === 'consultRent'
                  ? filteredListings.filter(listing => 
                      listing.listingStatus === 'For Rent' || 
                      listing.listingStatus === 'For Sale & Rent' ||
                      listing.listingStatus === 'ขายพร้อมผู้เช่า' ||
                      Boolean(listing.rentalPrice)
                    )
                  : filteredListings;
                
                return actionTypeFilteredListings.length > 0 ? (
                  <div className="divide-y">
                    {actionTypeFilteredListings.map((listing) => (
                      <div
                        key={listing.listingCode}
                        className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                          selectedListing?.listingCode === listing.listingCode ? 'bg-primary/10 border-l-4 border-primary' : ''
                        }`}
                        onClick={() => setSelectedListing(listing)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <HomeIcon className="h-4 w-4 mr-2 text-primary" />
                              <span className="font-medium">{listing.listingName}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {listing.listingCode} • {listing.propertyType} • {listing.bedrooms} BR
                            </div>
                          </div>
                          <Badge 
                            variant={listing.listingType === 'A List' ? 'default' : 'outline'}
                            className="text-xs px-2 py-0.5 h-5"
                          >
                            {listing.listingType}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Owner: </span>
                            {listing.ownerName}
                          </div>
                          <div>
                            {selectedActionType?.id === 'consultRent' && listing.rentalPrice ? (
                              <span className="font-medium">{new Intl.NumberFormat('th-TH').format(listing.rentalPrice)} ฿/mo</span>
                            ) : (
                              <span className="font-medium">{new Intl.NumberFormat('th-TH').format(listing.askingPrice)} ฿</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <HomeIcon className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>
                      {selectedActionType?.id === 'consultRent' 
                        ? 'No matching rental listings found' 
                        : 'No matching listings found'}
                    </p>
                    <p className="text-sm mt-1">
                      {selectedActionType?.id === 'consultRent'
                        ? 'Try a different search term or check listings with rental prices'
                        : 'Try a different search term'}
                    </p>
                  </div>
                );
              })()}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                onClick={handleProceedWithListing}
                disabled={!selectedListing}
                className="w-full"
              >
                {selectedActionType && selectedActionType.category === 'marketing' 
                  ? `Complete ${selectedActionType.name} Action` 
                  : 'Proceed with Selected Listing'}
              </Button>
            </div>
          </div>
        ) : isLeadSelectionView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromLeadSelection}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-primary" />
                {selectedActionType ? `Select Lead for ${selectedActionType.name}` : 'Select Lead'}
              </h4>
            </div>
            
            <div className="mb-4">
              <div className="relative">
                <Input
                  placeholder="Search leads by name, phone, or email..."
                  value={leadSearchTerm}
                  onChange={(e) => setLeadSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Please select which lead you want to perform this action on
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto border rounded-md">
              {(() => {
                const filteredLeads = leadSearchTerm.trim() === ''
                  ? leadsData
                  : leadsData.filter(lead => 
                      lead.name.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                      lead.phone.toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
                      (lead.email && lead.email.toLowerCase().includes(leadSearchTerm.toLowerCase()))
                    );
                
                return filteredLeads.length > 0 ? (
                  <div className="divide-y">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.phone}
                        className={`p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                          selectedLead?.phone === lead.phone ? 'bg-primary/10 border-l-4 border-primary' : ''
                        }`}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <UserIcon className="h-4 w-4 mr-2 text-primary" />
                              <span className="font-medium">{lead.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {lead.phone} • {lead.email}
                            </div>
                          </div>
                          <Badge 
                            variant="outline"
                            className={`text-xs px-2 py-0.5 h-5 ${
                              lead.potential === 'A' ? 'bg-green-100 text-green-800 border-green-200' :
                              lead.potential === 'B' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              lead.potential === 'C' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}
                          >
                            {lead.potential || 'C'}
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Project Interest: </span>
                            {lead.projectInterest}
                          </div>
                          <div>
                            <span className="font-medium">{new Intl.NumberFormat('th-TH').format(lead.budget)} ฿</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <UserIcon className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>No matching leads found</p>
                    <p className="text-sm mt-1">Try a different search term</p>
                  </div>
                );
              })()}
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button 
                onClick={handleProceedWithLead}
                disabled={!selectedLead}
                className="w-full"
              >
                Proceed with Selected Lead
              </Button>
            </div>
          </div>
        ) : isScriptEvaluationView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromScriptEvaluation}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-primary" />
                {selectedScriptType} Evaluation
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleScriptEvaluationSubmit}>
                <div className="space-y-6">
                  {/* Score Metrics */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Performance Metrics</h3>
                    
                    {/* Wording */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="wording">Wording</Label>
                        <span className="text-sm font-medium">{wording}%</span>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <Input
                          id="wording"
                          type="number"
                          min="0"
                          max="100"
                          value={wording}
                          onChange={handleWordingChange}
                          className="w-24"
                        />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreColorClass(wording)}`} 
                            style={{ width: `${wording}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tonality */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="tonality">Tonality</Label>
                        <span className="text-sm font-medium">{tonality}%</span>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <Input
                          id="tonality"
                          type="number"
                          min="0"
                          max="100"
                          value={tonality}
                          onChange={handleTonalityChange}
                          className="w-24"
                        />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreColorClass(tonality)}`} 
                            style={{ width: `${tonality}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rapport */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="rapport">Rapport</Label>
                        <span className="text-sm font-medium">{rapport}%</span>
                      </div>
                      <div className="flex space-x-3 items-center">
                        <Input
                          id="rapport"
                          type="number"
                          min="0"
                          max="100"
                          value={rapport}
                          onChange={handleRapportChange}
                          className="w-24"
                        />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getScoreColorClass(rapport)}`} 
                            style={{ width: `${rapport}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Average Score */}
                    <Card className="p-4 mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Average Score</h4>
                        <span className={`text-lg font-bold ${
                          averageScore >= 80 ? 'text-green-600' :
                          averageScore >= 60 ? 'text-yellow-600' :
                          averageScore >= 40 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>{averageScore}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getScoreColorClass(averageScore)}`} 
                          style={{ width: `${averageScore}%` }}
                        ></div>
                      </div>
                    </Card>
                  </div>
                  
                  {/* File Attachment */}
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Recording Attachment</Label>
                    <div className="border-2 border-dashed rounded-md p-4 text-center">
                      {!attachment ? (
                        <>
                          <UploadCloud className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag & drop or click to attach an audio recording
                          </p>
                          <Input 
                            id="attachment" 
                            type="file" 
                            accept="audio/*,.mp3,.wav,.m4a"
                            className="hidden" 
                            onChange={handleFileChange}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => document.getElementById('attachment')?.click()}
                          >
                            Select File
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between bg-muted/30 p-2 rounded">
                          <div className="flex items-center">
                            <div className="bg-primary/10 p-2 rounded mr-2">
                              <UploadCloud className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium truncate max-w-[200px]">
                              {attachmentName}
                            </span>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleRemoveFile}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Remarks */}
                  <div className="space-y-2">
                    <Label htmlFor="remark">Remarks from Mentor/Leader</Label>
                    <Textarea 
                      id="remark" 
                      placeholder="Add feedback or comments from your mentor..."
                      rows={4}
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="submit"
                      disabled={wording === 0 && tonality === 0 && rapport === 0}
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Submit Evaluation
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : isAcademyLearningView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromAcademy}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-primary" />
                {selectedAcademyType}
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleAcademySubmit}>
                <div className="space-y-6">
                  {/* Lesson Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lessonName">Lesson Name</Label>
                    <Input
                      id="lessonName"
                      placeholder="Enter the name of the lesson or course"
                      value={lessonName}
                      onChange={(e) => setLessonName(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Date and Time */}
                  <div className="space-y-2">
                    <Label htmlFor="lessonDateTime">Date & Time</Label>
                    <Input
                      id="lessonDateTime"
                      type="datetime-local"
                      value={lessonDateTime}
                      onChange={(e) => setLessonDateTime(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Lessons Learned */}
                  <div className="space-y-2">
                    <Label htmlFor="lessonsLearned">Lessons Learned</Label>
                    <Textarea 
                      id="lessonsLearned" 
                      placeholder="What did you learn from this session? What are the key takeaways?"
                      rows={6}
                      value={lessonsLearned}
                      onChange={(e) => setLessonsLearned(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit"
                      disabled={!lessonName || !lessonDateTime || !lessonsLearned}
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Record Learning
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : isRealCaseView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromRealCase}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-primary" />
                Real Case with Senior
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleRealCaseSubmit}>
                <div className="space-y-6">
                  {/* Senior Name */}
                  <div className="space-y-2">
                    <Label htmlFor="seniorName">Senior Name</Label>
                    <Select
                      value={seniorName}
                      onValueChange={(value) => setSeniorName(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select senior agent" />
                      </SelectTrigger>
                      <SelectContent>
                        {seniorAgents.map((agent) => (
                          <SelectItem key={agent.id} value={agent.name}>
                            {agent.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Date and Time */}
                  <div className="space-y-2">
                    <Label htmlFor="caseDateTime">Date & Time</Label>
                    <Input
                      id="caseDateTime"
                      type="datetime-local"
                      value={caseDateTime}
                      onChange={(e) => setCaseDateTime(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Case Type */}
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <Select
                      value={caseType}
                      onValueChange={(value) => setCaseType(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Survey">Survey</SelectItem>
                        <SelectItem value="Owner Visit">Owner Visit</SelectItem>
                        <SelectItem value="Showing">Showing</SelectItem>
                        <SelectItem value="Agreement">Agreement</SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Case Lesson */}
                  <div className="space-y-2">
                    <Label htmlFor="caseLesson">Case Lesson</Label>
                    <Textarea 
                      id="caseLesson" 
                      placeholder="Enter the case lesson"
                      rows={6}
                      value={caseLesson}
                      onChange={(e) => setCaseLesson(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="submit"
                      disabled={!seniorName || !caseDateTime || !caseType || !caseLesson}
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Record Case
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : isPresentProjectView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromPresentProject}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <HeartIcon className="h-5 w-5 mr-2 text-primary" />
                Present Project
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handlePresentProjectSubmit}>
                <div className="space-y-6">
                  {/* Project Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="projectSelect">Project</Label>
                    {!isAddingNewProject ? (
                      <>
                        <div className="relative">
                          <Select
                            value={selectedProject}
                            onValueChange={(value) => setSelectedProject(value)}
                            disabled={isAddingNewProject}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectsData.map((project) => (
                                <SelectItem key={project.id} value={project.name}>
                                  {project.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button 
                            type="button" 
                            variant="link" 
                            size="sm"
                            className="h-auto p-0 text-xs"
                            onClick={() => {
                              setIsAddingNewProject(true);
                              setSelectedProject('');
                            }}
                          >
                            Project not listed? Add new project
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Input
                            id="newProjectName"
                            placeholder="Enter new project name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            required
                          />
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => {
                                setIsAddingNewProject(false);
                                setNewProjectName('');
                              }}
                            >
                              Back to existing projects
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Date and Time */}
                  <div className="space-y-2">
                    <Label htmlFor="presentationDateTime">Date & Time</Label>
                    <Input
                      id="presentationDateTime"
                      type="datetime-local"
                      value={presentationDateTime}
                      onChange={(e) => setPresentationDateTime(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Presentation Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="presentationNotes">Presentation Notes</Label>
                    <Textarea 
                      id="presentationNotes" 
                      placeholder="Enter any notes or feedback from the presentation"
                      rows={6}
                      value={presentationNotes}
                      onChange={(e) => setPresentationNotes(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="submit"
                      disabled={
                        (isAddingNewProject ? !newProjectName : !selectedProject) || 
                        !presentationDateTime || 
                        !presentationNotes
                      }
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Record Presentation
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : isSurveyView ? (
          <div className="flex-1 flex flex-col px-6 pt-4 pb-6">
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={backFromSurvey}
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h4 className="font-medium flex items-center">
                <HomeIcon className="h-5 w-5 mr-2 text-primary" />
                Property Survey
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSurveySubmit}>
                <div className="space-y-6">
                  {/* Property Type Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={surveyPropertyType === 'Condo' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setSurveyPropertyType('Condo')}
                      >
                        Condo
                      </Button>
                      <Button
                        type="button"
                        variant={surveyPropertyType === 'House' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setSurveyPropertyType('House')}
                      >
                        House/Other
                      </Button>
                    </div>
                  </div>
                  
                  {/* Dynamic Form Fields Based on Property Type */}
                  <div className="space-y-6">
                    <ScrollArea className="h-[60vh] pr-4">
                      {(surveyPropertyType === 'Condo' ? condoSurveyFields : houseSurveyFields).map((field) => (
                        <div key={field.id} className="mb-4">
                          <Label htmlFor={field.id} className="mb-1 block">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </Label>
                          {field.textArea ? (
                            <Textarea
                              id={field.id}
                              placeholder={field.label}
                              value={surveyFormData[field.id] || ''}
                              onChange={(e) => handleSurveyFieldChange(field.id, e.target.value)}
                              required={field.required}
                              rows={4}
                            />
                          ) : (
                            <Input
                              id={field.id}
                              placeholder={field.label}
                              value={surveyFormData[field.id] || ''}
                              onChange={(e) => handleSurveyFieldChange(field.id, e.target.value)}
                              required={field.required}
                            />
                          )}
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                  
                  {/* Form Actions */}
                  <div className="flex justify-end space-x-2 pt-4 sticky bottom-0 bg-background pb-2">
                    <Button 
                      type="submit"
                      className="w-full"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Submit Survey
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="log" className="flex-1 flex flex-col">
            <div className="px-6 pt-4 pb-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger 
                  value="log" 
                  onClick={() => setActiveTab('log')}
                >
                  <ClipboardCheckIcon className="h-4 w-4 mr-2" />
                  Action
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  onClick={() => setActiveTab('history')}
                >
                  <HistoryIcon className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Action Tab Content */}
            <TabsContent value="log" className="flex-1 px-6 pt-2 pb-4 flex flex-col">
              {selectedCategory ? (
                <>
                  {/* Category View */}
                  <div className="flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={backToCategories}
                    >
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Back
                    </Button>
                    <h4 className="font-medium flex items-center">
                      {getCategoryIcon(selectedCategory)}
                      <span className="ml-2">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Actions</span>
                    </h4>
                  </div>
                  
                    <div>
                    <div className="space-y-3 pb-6">
                      {actionTypes
                        .filter(action => action.category === selectedCategory)
                        .map(action => (
                          <div 
                            key={action.id} 
                              className={`flex items-center justify-between p-3 rounded-md border ${
                                action.category === 'product' ? 'border-blue-200 bg-blue-50/50' :
                                action.category === 'owner' ? 'border-green-200 bg-green-50/50' :
                                action.category === 'buyer' ? 'border-purple-200 bg-purple-50/50' :
                                action.category === 'marketing' ? 'border-rose-200 bg-rose-50/50' :
                                'border-primary/30 bg-primary/5'
                              } hover:bg-opacity-70 cursor-pointer`}
                              onClick={() => handleActionClick(action)}
                            >
                              <div className="flex items-center">
                                <button 
                                  className="p-1.5 mr-2 rounded-full hover:bg-muted/20"
                                  onClick={(e) => toggleFavorite(action.id, e)}
                                  aria-label={favoriteActions.includes(action.id) ? "Remove from favorites" : "Add to favorites"}
                                >
                                  <Star className={`h-4 w-4 ${favoriteActions.includes(action.id) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} />
                                </button>
                                <div className={`p-1.5 rounded-full ${
                                  action.category === 'product' ? 'bg-blue-100' :
                                  action.category === 'owner' ? 'bg-green-100' :
                                  action.category === 'buyer' ? 'bg-purple-100' :
                                  action.category === 'marketing' ? 'bg-rose-100' :
                                  'bg-primary/20'
                                } mr-2`}>
                                  {getCategoryIcon(action.category)}
                                </div>
                            <div>
                              <div className="font-medium">{action.name}</div>
                              <div className="text-muted-foreground text-sm">{action.description}</div>
                            </div>
                              </div>
                              <Badge className={`${
                                action.category === 'product' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                action.category === 'owner' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                action.category === 'buyer' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                                action.category === 'marketing' ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' :
                                'bg-primary/20 text-primary hover:bg-primary/30'
                              } border-none`}>
                                {action.category === 'personal' ? 'Self-Improvement' : `+${action.points} pts`}
                              </Badge>
                          </div>
                        ))
                      }
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  {/* Action Categories Section - moved to top */}
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Action Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-green-200 hover:bg-green-50"
                        onClick={() => selectCategory('owner')}
                      >
                        <UserIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Owner</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-purple-200 hover:bg-purple-50"
                        onClick={() => selectCategory('buyer')}
                      >
                        <ShoppingCartIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Buyer</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-blue-200 hover:bg-blue-50"
                        onClick={() => selectCategory('product')}
                      >
                        <HomeIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Product</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-rose-200 hover:bg-rose-50"
                        onClick={() => selectCategory('marketing')}
                      >
                        <MegaphoneIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Marketing</span>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="rounded-full border-pink-200 hover:bg-pink-50"
                        onClick={() => selectCategory('personal')}
                      >
                        <HeartIcon className="h-3.5 w-3.5 mr-1.5" />
                        <span>Personal</span>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Favorite Actions Section - renamed to Starred */}
                  <div>
                    <h4 className="font-medium mb-3 text-foreground">Starred</h4>
                    <div className="space-y-2">
                      {/* Dynamically show favorite actions */}
                      {favoriteActions.length > 0 ? (
                        favoriteActions.map(actionId => {
                          const action = actionTypes.find(a => a.id === actionId);
                          if (!action) return null;
                    
                        return (
                                <div 
                                  key={action.id}
                                  className={`flex items-center justify-between p-3 rounded-md border ${
                                    action.category === 'product' ? 'border-blue-200 bg-blue-50/50' :
                                    action.category === 'owner' ? 'border-green-200 bg-green-50/50' :
                                    action.category === 'buyer' ? 'border-purple-200 bg-purple-50/50' :
                                    action.category === 'marketing' ? 'border-rose-200 bg-rose-50/50' :
                                    'border-primary/30 bg-primary/5'
                                  } hover:bg-opacity-70 cursor-pointer`}
                                  onClick={() => handleActionClick(action)}
                                >
                                  <div className="flex items-center">
                                    <button 
                                      className="p-1.5 mr-2 rounded-full hover:bg-muted/20"
                                      onClick={(e) => toggleFavorite(action.id, e)}
                                      aria-label={favoriteActions.includes(action.id) ? "Remove from favorites" : "Add to favorites"}
                                    >
                                      <Star className={`h-4 w-4 ${favoriteActions.includes(action.id) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} />
                                    </button>
                                    <div className={`p-1.5 rounded-full ${
                                      action.category === 'product' ? 'bg-blue-100' :
                                      action.category === 'owner' ? 'bg-green-100' :
                                      action.category === 'buyer' ? 'bg-purple-100' :
                                      action.category === 'marketing' ? 'bg-rose-100' :
                                      'bg-primary/20'
                                    } mr-2`}>
                                      {getCategoryIcon(action.category)}
                                    </div>
                              <div>
                                      <div className="font-medium">{action.name}</div>
                                      <div className="text-muted-foreground text-sm">{action.description}</div>
                              </div>
                            </div>
                                <Badge className={`${
                                  action.category === 'product' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                                  action.category === 'owner' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                  action.category === 'buyer' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' :
                                  action.category === 'marketing' ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' :
                                  'bg-primary/20 text-primary hover:bg-primary/30'
                                } border-none`}>
                                  {action.category === 'personal' ? 'Self-Improvement' : `+${action.points} pts`}
                                </Badge>
                        </div>
                      );
                        })
                      ) : (
                        <div className="text-center p-4 text-muted-foreground border rounded-md">
                          <p>No starred actions yet</p>
                          <p className="text-sm mt-1">Click the star icon on any action to add it to starred</p>
                    </div>
                  )}
                </div>
              </div>
                </div>
              )}
            </TabsContent>
            
            {/* History Tab Content */}
            <TabsContent value="history" className="flex-1 px-6 pt-2 pb-4 flex flex-col">
              {/* Content removed for redesign */}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
  
  // FAB button that triggers the drawer/sheet
  const fabButton = (
    <Button 
      size="icon" 
      className="h-14 w-14 rounded-full fixed bottom-6 right-6 shadow-lg z-50 bg-primary hover:bg-primary/90"
      onClick={() => setIsOpen(true)}
    >
      <PlusIcon className="h-6 w-6" />
      <span className="sr-only">Log Action</span>
    </Button>
  );

  // Use Drawer for mobile and Sheet for desktop
  if (isMobile) {
    return (
      <>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          {fabButton}
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh] h-[90vh] p-0 bg-background flex flex-col">
          <DrawerTitle className="sr-only">Action Tracker</DrawerTitle>
          {actionTrackerContent}
        </DrawerContent>
      </Drawer>
        
        {/* Add Listing Modal */}
        <AddListingModal 
          isOpen={isAddListingModalOpen}
          onClose={() => setIsAddListingModalOpen(false)}
          onSubmit={handleSubmitListing}
          initialTab={activeModalTab}
        />
        
        {/* Listing Details Drawer for Owner Visit */}
        <ListingDetailsDrawer 
          isOpen={isListingDetailsDrawerOpen}
          onClose={() => setIsListingDetailsDrawerOpen(false)}
          listing={selectedListing}
          initialTab={listingDetailsDrawerActiveTab}
        />
        
        {/* Lead Details Drawer for Buyer Actions */}
        <LeadDetailsDrawer 
          isOpen={isLeadDetailsDrawerOpen}
          onClose={() => setIsLeadDetailsDrawerOpen(false)}
          lead={selectedLead}
          initialTab={selectedLeadDetailsTab}
        />
      </>
    );
  }
  
  return (
    <>
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {fabButton}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l">
        <SheetTitle className="sr-only">Action Tracker</SheetTitle>
        {actionTrackerContent}
      </SheetContent>
    </Sheet>
      
      {/* Add Listing Modal */}
      <AddListingModal 
        isOpen={isAddListingModalOpen}
        onClose={() => setIsAddListingModalOpen(false)}
        onSubmit={handleSubmitListing}
        initialTab={activeModalTab}
      />
      
      {/* Listing Details Drawer for Owner Visit */}
      <ListingDetailsDrawer 
        isOpen={isListingDetailsDrawerOpen}
        onClose={() => setIsListingDetailsDrawerOpen(false)}
        listing={selectedListing}
        initialTab={listingDetailsDrawerActiveTab}
      />
      
      {/* Lead Details Drawer for Buyer Actions */}
      <LeadDetailsDrawer 
        isOpen={isLeadDetailsDrawerOpen}
        onClose={() => setIsLeadDetailsDrawerOpen(false)}
        lead={selectedLead}
        initialTab={selectedLeadDetailsTab}
      />
    </>
  );
};

export default ActionTrackerFAB; 