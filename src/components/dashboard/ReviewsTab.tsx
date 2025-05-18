import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Achiever, NewSalesData } from '@/components/leaderboard/data';

type ReviewsTabProps = {
  salesData: Achiever | NewSalesData;
};

// Helper to generate random dates within the last 3 months
const getRandomDate = () => {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setMonth(today.getMonth() - Math.floor(Math.random() * 3) - 1);
  pastDate.setDate(Math.floor(Math.random() * 28) + 1);
  
  return pastDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    name: 'John Smith',
    avatar: 'JS',
    image: '/avatars/john.jpg',
    rating: 5,
    comment: 'Excellent service! The agent was very responsive and helped me find exactly what I was looking for. Would highly recommend!',
    date: getRandomDate(),
    propertyType: 'Condo',
    verified: true
  },
  {
    id: 2,
    name: 'Lisa Wong',
    avatar: 'LW',
    image: '/avatars/lisa.jpg',
    rating: 4,
    comment: 'Professional and knowledgeable. Good communication throughout the entire process. Only reason for 4 stars is we had a small delay in paperwork.',
    date: getRandomDate(),
    propertyType: 'Townhouse',
    verified: true
  },
  {
    id: 3,
    name: 'Michael Davis',
    avatar: 'MD',
    image: '/avatars/michael.jpg',
    rating: 5,
    comment: 'Outstanding service from start to finish. Always available to answer questions and made the whole process stress-free.',
    date: getRandomDate(),
    propertyType: 'Single Family',
    verified: true
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'SJ',
    image: '/avatars/sarah.jpg',
    rating: 3,
    comment: 'Decent service. Could have been more proactive with updates and feedback from viewings, but overall got the job done.',
    date: getRandomDate(),
    propertyType: 'Apartment',
    verified: false
  }
];

const ReviewsTab: React.FC<ReviewsTabProps> = ({ salesData }) => {
  // Calculate average rating
  const averageRating = sampleReviews.reduce((acc, review) => acc + review.rating, 0) / sampleReviews.length;
  
  return (
    <div className="p-6 focus-visible:outline-none focus-visible:ring-0">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <MessageSquare className="h-5 w-5 mr-2 text-primary" />
        Customer Reviews
      </h3>
      
      {/* Summary Section */}
      <Card className="p-4 border mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Overall Rating</div>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= Math.round(averageRating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Total Reviews</div>
            <div className="text-2xl font-bold">{sampleReviews.length}</div>
          </div>
        </div>
      </Card>
      
      {/* Reviews List */}
      <div className="space-y-4">
        {sampleReviews.map((review) => (
          <Card key={review.id} className="p-4 border">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={review.image} alt={review.name} />
                  <AvatarFallback>{review.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>{review.date}</span>
                    <span>•</span>
                    <span>{review.propertyType}</span>
                    {review.verified && (
                      <>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs py-0 h-5">Verified</Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-3.5 w-3.5 ${star <= review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            
            <p className="text-sm">{review.comment}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab; 