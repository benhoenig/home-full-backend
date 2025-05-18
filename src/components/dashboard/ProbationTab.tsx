import React, { useState } from 'react';
import { ClipboardList, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, ListChecks, BookOpen, Gauge, BarChart2, ChevronDown, ChevronUp, MessageSquare, Edit, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewSalesData } from '@/components/leaderboard/data';
import ProgressBar from './drawer/SalesProgressBar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ProbationTabProps = {
  salesData: NewSalesData;
  canEditComments?: boolean;
};

const ProbationTab: React.FC<ProbationTabProps> = ({ salesData, canEditComments = false }) => {
  const [selectedMonth, setSelectedMonth] = useState<1 | 2 | 3>(2);
  const [expandedCards, setExpandedCards] = useState({
    probationStatus: true,
    monthlyPerformance: true,
    mentorsComments: true,
    probationRequirements: true,
  });
  const [commentIndex, setCommentIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  
  // Mock mentor comments data
  const mentorComments = [
    {
      date: "Apr 10, 2023",
      comment: "Great improvement on owner scripts. You've shown consistent progress with your communication skills. Focus more on active listening techniques.",
      month: 3
    },
    {
      date: "Mar 25, 2023",
      comment: "Need to work on your closing techniques. Your surveys are good but conversion rate could be better. Let's schedule a practice session next week.",
      month: 3
    },
    {
      date: "Mar 15, 2023",
      comment: "You're showing good progress with new listings. Build more confidence in presenting projects. Try the techniques we discussed in training.",
      month: 2
    },
    {
      date: "Feb 28, 2023",
      comment: "Good job handling that difficult owner last week. Your approach was professional and you managed expectations well.",
      month: 2
    },
    {
      date: "Feb 10, 2023",
      comment: "You need to improve your follow-up process. Several leads went cold because of delayed responses. Let's work on a better system.",
      month: 1
    },
    {
      date: "Jan 25, 2023",
      comment: "Strong start with client consultations. Your rapport-building is natural. Continue focusing on asking better qualifying questions.",
      month: 1
    }
  ];
  
  // Filter comments by selected month
  const currentMonthComments = mentorComments.filter(comment => comment.month === selectedMonth);
  
  const handleNextComment = () => {
    if (commentIndex < currentMonthComments.length - 1) {
      setCommentIndex(commentIndex + 1);
    }
  };
  
  const handlePrevComment = () => {
    if (commentIndex > 0) {
      setCommentIndex(commentIndex - 1);
    }
  };
  
  const toggleCard = (card: keyof typeof expandedCards) => {
    setExpandedCards(prev => ({
      ...prev,
      [card]: !prev[card]
    }));
  };
  
  const handlePrevMonth = () => {
    if (selectedMonth > 1) {
      setSelectedMonth((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };
  
  const handleNextMonth = () => {
    if (selectedMonth < 3) {
      setSelectedMonth((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };
  
  // Month label based on selection
  const getMonthLabel = () => {
    switch (selectedMonth) {
      case 1: return "Month 1 (Jan 15 - Feb 15)";
      case 2: return "Month 2 (Feb 15 - Mar 15)";
      case 3: return "Month 3 (Mar 15 - Apr 15)";
    }
  };
  
  // Progress data for each month
  const monthData = {
    1: {
      progress: 75,
      color: "teal",
      actions: {
        newList: { count: 8, target: 10 },
        ownerVisit: { count: 6, target: 8 },
        consult2: { count: 5, target: 6 },
        consult5: { count: 4, target: 5 },
        survey: { count: 3, target: 4 },
        presentProject: { count: 7, target: 8 },
        aList: { count: 2, target: 3 }
      },
      scripts: {
        owner: { wording: 85, tonality: 80, rapport: 82, total: 82 },
        consulting: { wording: 78, tonality: 82, rapport: 80, total: 80 },
        buyer: { wording: 76, tonality: 75, rapport: 74, total: 75 }
      },
      requirements: {
        trainingCompleted: { count: 4, target: 5 },
        academyWatched: { count: 8, target: 10 },
        realCase: { count: 1, target: 3 }
      }
    },
    2: {
      progress: 50,
      color: "amber",
      actions: {
        newList: { count: 5, target: 10 },
        ownerVisit: { count: 4, target: 8 },
        consult2: { count: 3, target: 6 },
        consult5: { count: 2, target: 5 },
        survey: { count: 1, target: 4 },
        presentProject: { count: 4, target: 8 },
        aList: { count: 1, target: 3 }
      },
      scripts: {
        owner: { wording: 75, tonality: 70, rapport: 72, total: 72 },
        consulting: { wording: 68, tonality: 72, rapport: 70, total: 70 },
        buyer: { wording: 66, tonality: 65, rapport: 64, total: 65 }
      },
      requirements: {
        trainingCompleted: { count: 3, target: 5 },
        academyWatched: { count: 5, target: 10 },
        realCase: { count: 1, target: 3 }
      }
    },
    3: {
      progress: 25,
      color: "rose",
      actions: {
        newList: { count: 2, target: 10 },
        ownerVisit: { count: 1, target: 8 },
        consult2: { count: 1, target: 6 },
        consult5: { count: 0, target: 5 },
        survey: { count: 0, target: 4 },
        presentProject: { count: 1, target: 8 },
        aList: { count: 0, target: 3 }
      },
      scripts: {
        owner: { wording: 65, tonality: 60, rapport: 62, total: 62 },
        consulting: { wording: 58, tonality: 62, rapport: 60, total: 60 },
        buyer: { wording: 56, tonality: 55, rapport: 54, total: 55 }
      },
      requirements: {
        trainingCompleted: { count: 1, target: 5 },
        academyWatched: { count: 2, target: 10 },
        realCase: { count: 0, target: 3 }
      }
    }
  };
  
  const currentMonthData = monthData[selectedMonth];
  
  // Helper function to dynamically apply color classes
  const getColorClass = (type: string, color: string) => {
    if (type === 'bg') {
      if (color === 'teal') return 'bg-teal-600';
      if (color === 'amber') return 'bg-amber-500';
      if (color === 'rose') return 'bg-rose-600';
    } else if (type === 'text') {
      if (color === 'teal') return 'text-teal-600';
      if (color === 'amber') return 'text-amber-500';
      if (color === 'rose') return 'text-rose-600';
    }
    return '';
  };
  
  // Get current date in format "MMM DD, YYYY"
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  return (
    <div className="p-4 sm:p-6 focus-visible:outline-none focus-visible:ring-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <ClipboardList className="h-5 w-5 mr-2 text-primary" />
          Probation Status
        </h3>
        <Badge className="bg-amber-500">In Progress</Badge>
      </div>
      
      <div className="space-y-5">
        {/* Combined Probation Progress Card */}
        <Collapsible 
          open={expandedCards.probationStatus} 
          onOpenChange={() => toggleCard('probationStatus')}
          className="border rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <div className="p-4 px-4 sm:px-5 border-b flex items-center justify-between">
            <h4 className="text-base font-medium flex items-center text-primary">
              <ArrowUpRight className="h-4 w-4 mr-1.5 opacity-80" />
              Overall Probation Status
            </h4>
            <CollapsibleTrigger asChild>
              <button className="h-6 w-6 rounded-md hover:bg-gray-100 flex items-center justify-center">
                {expandedCards.probationStatus ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 sm:px-5 py-4 space-y-6">
              {/* Overall Progress */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium">Probation Progress</span>
                  <span className="font-semibold text-teal-600">67%</span>
                </div>
                <ProgressBar 
                  value={67} 
                  color="teal" 
                  showLabels={true} 
                  startLabel="Start" 
                  endLabel="Goal: 80%" 
                />
              </div>
              
              {/* Mentor Information */}
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium flex items-center">
                  <span className="mr-1.5">Mentor:</span>
                </span>
                <span className="font-medium text-primary">Jessica Wong</span>
              </div>
              
              {/* Separator */}
              <div className="border-t border-border"></div>
              
              {/* Probation Period Progress */}
              <div>
                <div className="mb-2 flex justify-between">
                  <span className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span className="hidden xs:inline">Probation Period (3 months)</span>
                    <span className="xs:hidden">Probation (3m)</span>
                  </span>
                  <span className="font-semibold text-amber-500">Month 2</span>
                </div>
                <div className="relative">
                  <div className="bg-slate-100 rounded-full w-full h-3">
                    <div 
                      className="bg-amber-500 h-3 rounded-full"
                      style={{ width: '50%' }}
                    ></div>
                  </div>
                  
                  {/* Month Indicators */}
                  <div className="absolute top-0 left-0 right-0 h-full flex">
                    {/* Month 1 divider */}
                    <div className="w-1/3 h-full relative">
                      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white z-10"></div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">M1</div>
                    </div>
                    
                    {/* Month 2 divider */}
                    <div className="w-1/3 h-full relative">
                      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white z-10"></div>
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">M2</div>
                    </div>
                    
                    {/* Month 3 */}
                    <div className="w-1/3 h-full relative">
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">M3</div>
                    </div>
                  </div>
                  
                  {/* Current position indicator */}
                  <div className="absolute top-0 left-[50%] h-3 w-3 rounded-full bg-white border-2 border-amber-500 -translate-x-1/2 z-20"></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-6">
                  <span>Jan 15, 2023</span>
                  <span>Apr 15, 2023</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Detailed Monthly Performance Card */}
        <Collapsible 
          open={expandedCards.monthlyPerformance} 
          onOpenChange={() => toggleCard('monthlyPerformance')}
          className="border rounded-lg overflow-hidden bg-white shadow-sm"
        >
          {/* Month Selection Header */}
          <div className="p-4 px-4 sm:px-5 pb-3 border-b flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-base font-medium">Monthly Performance</h4>
            <div className="flex items-center">
              <button 
                onClick={handlePrevMonth}
                disabled={selectedMonth === 1}
                className={`rounded-full p-1 ${selectedMonth === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-xs sm:text-sm font-medium px-2 min-w-[110px] text-center">
                {getMonthLabel()}
              </span>
              <button 
                onClick={handleNextMonth}
                disabled={selectedMonth === 3}
                className={`rounded-full p-1 ${selectedMonth === 3 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <CollapsibleTrigger asChild>
                <button className="h-6 w-6 rounded-md hover:bg-gray-100 flex items-center justify-center ml-1">
                  {expandedCards.monthlyPerformance ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </button>
              </CollapsibleTrigger>
            </div>
          </div>
          
          <CollapsibleContent>
            {/* Month Progress Indicator */}
            <div className="pt-4 px-4 sm:px-5">
              <div className="mb-2 flex justify-between">
                <span className="font-medium flex items-center">
                  <span className={`h-2 w-2 rounded-full ${getColorClass('bg', currentMonthData.color)} mr-2`}></span>
                  Month {selectedMonth} Progress:
                </span>
                <span className={`font-semibold ${getColorClass('text', currentMonthData.color)}`}>{currentMonthData.progress}%</span>
              </div>
              <ProgressBar 
                value={currentMonthData.progress} 
                color={currentMonthData.color as 'teal' | 'amber' | 'rose'} 
              />
            </div>
            
            <div className="px-4 sm:px-5 pt-5 pb-1">
              {/* Actions Section */}
              <div className="mb-5">
                <h5 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
                  <ListChecks className="h-4 w-4 mr-1.5" />
                  Actions
                </h5>
                <div className="space-y-3">
                  {Object.entries(currentMonthData.actions).map(([key, { count, target }]) => {
                    const label = key === 'newList' ? 'New List' :
                                 key === 'ownerVisit' ? 'Owner Visit' :
                                 key === 'consult2' ? 'Consult 2%' :
                                 key === 'consult5' ? 'Consult 5%' :
                                 key === 'survey' ? 'Survey' :
                                 key === 'presentProject' ? 'Present Project' : 'A List';
                    
                    const percentage = Math.round((count / target) * 100);
                    
                    return (
                      <div key={key}>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>{label}</span>
                          <span>{count}/{target}</span>
                        </div>
                        <div className="bg-slate-100 rounded-full w-full h-1.5">
                          <div 
                            className={`${getColorClass('bg', currentMonthData.color)} h-1.5 rounded-full`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Separator between Actions and Skillset */}
              <div className="border-t border-border/40 my-5"></div>
              
              {/* Skillset Section */}
              <div className="mb-5">
                <h5 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
                  <Gauge className="h-4 w-4 mr-1.5" />
                  Skillset
                </h5>
                <ScrollArea className="w-full">
                  <div className="min-w-[400px]">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-muted-foreground">
                          <th className="pb-2 font-medium text-left w-1/3">Script Type</th>
                          <th className="pb-2 font-medium text-center">Wording</th>
                          <th className="pb-2 font-medium text-center">Tonality</th>
                          <th className="pb-2 font-medium text-center">Rapport</th>
                          <th className="pb-2 font-medium text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(currentMonthData.scripts).map(([key, scores]) => {
                          const label = key === 'owner' ? 'Owner Script' :
                                       key === 'consulting' ? 'Consulting Script' : 'Buyer Script';
                          
                          return (
                            <tr key={key} className="border-b border-border/40 last:border-0">
                              <td className="py-2 text-left">{label}</td>
                              <td className="py-2 text-center">{scores.wording}%</td>
                              <td className="py-2 text-center">{scores.tonality}%</td>
                              <td className="py-2 text-center">{scores.rapport}%</td>
                              <td className="py-2 text-center font-medium">{scores.total}%</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </div>
              
              {/* Separator between Skillset and Requirements */}
              <div className="border-t border-border/40 my-5"></div>
              
              {/* Requirements Section */}
              <div className="mb-3">
                <h5 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Requirements
                </h5>
                <div className="space-y-3">
                  {Object.entries(currentMonthData.requirements).map(([key, { count, target }]) => {
                    const label = key === 'trainingCompleted' ? 'Training Completed' :
                                 key === 'academyWatched' ? 'HOME Academy Watched' : 'Real Case with Senior';
                    
                    const percentage = Math.round((count / target) * 100);
                    
                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm truncate pr-2">{label}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-medium">{count}/{target}</span>
                          <div className="h-2 w-12 sm:w-16 bg-slate-100 rounded-full">
                            <div 
                              className={`${getColorClass('bg', currentMonthData.color)} h-2 rounded-full`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Separator between Requirements and Action Score */}
              <div className="border-t border-border/40 my-5"></div>
              
              {/* Action Score Section */}
              <div className="mb-3">
                <h5 className="text-sm font-medium mb-3 flex items-center text-muted-foreground">
                  <BarChart2 className="h-4 w-4 mr-1.5" />
                  Action Score
                </h5>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm">Total Performance</span>
                  <span className="text-sm font-medium">{currentMonthData.progress * 0.8 + 10}/{80}</span>
                </div>
                <div className="bg-slate-100 rounded-full w-full h-1.5">
                  <div 
                    className={`${getColorClass('bg', currentMonthData.color)} h-1.5 rounded-full`}
                    style={{ width: `${Math.min(100, (currentMonthData.progress * 0.8 + 10) / 80 * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Mentor's Comments Section */}
        <Collapsible 
          open={expandedCards.mentorsComments} 
          onOpenChange={() => toggleCard('mentorsComments')}
          className="border rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <div className="p-4 px-4 sm:px-5 border-b flex items-center justify-between">
            <h4 className="text-base font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-1.5 text-primary opacity-80" />
              Mentor's Comments
            </h4>
            <CollapsibleTrigger asChild>
              <button className="h-6 w-6 rounded-md hover:bg-gray-100 flex items-center justify-center">
                {expandedCards.mentorsComments ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 sm:px-5 py-4">
              {currentMonthComments.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Month {selectedMonth} Comments ({commentIndex + 1}/{currentMonthComments.length})
                    </span>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={handlePrevComment}
                        disabled={commentIndex === 0}
                        className={`rounded-full p-1 ${commentIndex === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={handleNextComment}
                        disabled={commentIndex === currentMonthComments.length - 1}
                        className={`rounded-full p-1 ${commentIndex === currentMonthComments.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      {canEditComments && (
                        <>
                          <button 
                            onClick={() => {
                              setNewComment(currentMonthComments[commentIndex].comment);
                              setEditingComment(true);
                              setIsAddingComment(false);
                            }}
                            className="rounded-full p-1 text-gray-600 hover:bg-gray-100 ml-1"
                            title="Edit Comment"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setNewComment('');
                              setEditingComment(false);
                              setIsAddingComment(true);
                            }}
                            className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
                            title="Add New Comment"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {isAddingComment && canEditComments ? (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        {getCurrentDate()} (New)
                      </div>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] text-sm"
                        placeholder="Enter your new comment..."
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsAddingComment(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            // In a real app, this would save to the server
                            // For now, we'll just add the comment to our mock data
                            const newCommentObj = {
                              date: getCurrentDate(),
                              comment: newComment,
                              month: selectedMonth
                            };
                            
                            // In a real implementation, we would update the server data
                            // and then refresh the comments list
                            setIsAddingComment(false);
                            
                            // Show a success message or visual confirmation
                            alert('Comment added successfully!');
                          }}
                        >
                          Add Comment
                        </Button>
                      </div>
                    </div>
                  ) : editingComment && canEditComments ? (
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        {currentMonthComments[commentIndex].date}
                      </div>
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] text-sm"
                        placeholder="Enter your comment..."
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingComment(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            // In a real app, this would save to the server
                            // For now, we'll just update the comment in our mock data
                            const updatedComments = [...mentorComments];
                            updatedComments[commentIndex] = {
                              ...updatedComments[commentIndex],
                              comment: newComment
                            };
                            setEditingComment(false);
                          }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-3 border border-border/30">
                      <div className="text-xs text-muted-foreground mb-1">
                        {currentMonthComments[commentIndex].date}
                      </div>
                      <p className="text-sm">
                        {currentMonthComments[commentIndex].comment}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {currentMonthComments.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCommentIndex(idx)}
                          className={`h-1.5 rounded-full ${idx === commentIndex ? 'w-4 bg-primary' : 'w-1.5 bg-gray-300'}`}
                          aria-label={`View comment ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No comments available for this month.
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        <Collapsible 
          open={expandedCards.probationRequirements} 
          onOpenChange={() => toggleCard('probationRequirements')}
          className="border rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <div className="p-4 sm:p-5 flex items-center justify-between">
            <h4 className="font-medium">Probation Requirements</h4>
            <CollapsibleTrigger asChild>
              <button className="h-6 w-6 rounded-md hover:bg-gray-100 flex items-center justify-center">
                {expandedCards.probationRequirements ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5">
              <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                <li>Complete all training modules</li>
                <li>Achieve minimum 10 new listings</li>
                <li>Maintain 80% script performance</li>
                <li>Complete 3 real cases with senior agent</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProbationTab; 