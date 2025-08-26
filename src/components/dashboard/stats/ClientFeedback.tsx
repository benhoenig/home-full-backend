import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, ThumbsUp, MessageCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClientFeedbackProps {
  selectedMember?: string;
}

// Mock client feedback data
const getClientFeedback = (memberKey: string = 'all') => {
  const baseData = {
    rating: {
      overall: 4.6,
      totalReviews: 127,
      distribution: [
        { stars: 5, count: 78, percentage: 61 },
        { stars: 4, count: 32, percentage: 25 },
        { stars: 3, count: 12, percentage: 9 },
        { stars: 2, count: 4, percentage: 3 },
        { stars: 1, count: 1, percentage: 1 },
      ]
    },
    categories: [
      { name: 'Communication', rating: 4.8, color: 'bg-blue-500' },
      { name: 'Professionalism', rating: 4.7, color: 'bg-green-500' },
      { name: 'Market Knowledge', rating: 4.5, color: 'bg-purple-500' },
      { name: 'Responsiveness', rating: 4.6, color: 'bg-orange-500' },
      { name: 'Negotiation', rating: 4.4, color: 'bg-red-500' },
    ],
    recentReviews: [
      {
        id: 1,
        client: 'คุณสมศรี ใจดี',
        rating: 5,
        date: '2024-01-15',
        comment: 'บริการดีมาก ให้คำปรึกษาดี และติดตามงานอย่างใกล้ชิด ประทับใจมากครับ',
        property: 'Noble BE33',
        type: 'Buyer'
      },
      {
        id: 2,
        client: 'คุณประเสริฐ วงศ์ใหญ่',
        rating: 5,
        date: '2024-01-12',
        comment: 'ช่วยหาบ้านให้ได้ตามงบและความต้องการ ขายเก่ง แนะนำเลยครับ',
        property: 'The Reserve Thonglor',
        type: 'Buyer'
      },
      {
        id: 3,
        client: 'คุณวิภาดา สุขใส',
        rating: 4,
        date: '2024-01-10',
        comment: 'ช่วยขายคอนโดให้ได้ราคาดี เจรจาเก่ง ขอบคุณมากค่ะ',
        property: 'Ashton Asoke',
        type: 'Seller'
      }
    ]
  };

  // Adjust data based on selected member
  if (memberKey === 'all') return baseData;
  
  const memberAdjustments: Record<string, any> = {
    alex: { ratingDiff: 0.1, reviewsDiff: -20 },
    sarah: { ratingDiff: 0.3, reviewsDiff: 15 },
    michael: { ratingDiff: -0.2, reviewsDiff: -30 },
    emma: { ratingDiff: 0.0, reviewsDiff: -10 },
    david: { ratingDiff: 0.1, reviewsDiff: -15 },
  };

  const adjustment = memberAdjustments[memberKey] || { ratingDiff: 0, reviewsDiff: 0 };
  
  return {
    ...baseData,
    rating: {
      ...baseData.rating,
      overall: Math.min(5, Math.max(1, baseData.rating.overall + adjustment.ratingDiff)),
      totalReviews: Math.max(10, baseData.rating.totalReviews + adjustment.reviewsDiff)
    },
    categories: baseData.categories.map(cat => ({
      ...cat,
      rating: Math.min(5, Math.max(1, cat.rating + adjustment.ratingDiff))
    }))
  };
};

const ClientFeedback: React.FC<ClientFeedbackProps> = ({ selectedMember = 'all' }) => {
  const data = getClientFeedback(selectedMember);
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Get member name for display
  const memberNames: Record<string, string> = {
    all: 'Team',
    alex: 'Alex Johnson',
    sarah: 'Sarah Williams', 
    michael: 'Michael Brown',
    emma: 'Emma Davis',
    david: 'David Chen'
  };

  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const stars = [];
    const sizeClass = size === 'lg' ? 'h-5 w-5' : 'h-4 w-4';
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`${sizeClass} ${
            i <= Math.floor(rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : i <= rating 
                ? 'fill-yellow-200 text-yellow-400' 
                : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Client Feedback</CardTitle>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <div className="text-2xl font-bold text-yellow-500">{data.rating.overall.toFixed(1)}</div>
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-xs text-muted-foreground">{data.rating.totalReviews} reviews</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {memberNames[selectedMember]} • Client Satisfaction
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            {/* Rating Distribution */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm mb-3">Rating Distribution</h4>
              {data.rating.distribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            {/* Category Ratings */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm mb-3">Performance Categories</h4>
              {data.categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`} />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(category.rating)}
                    </div>
                    <span className="text-sm font-medium">{category.rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            {/* Recent Reviews */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-sm">Recent Reviews</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {showAllReviews ? 'Show Less' : 'View All'}
                </Button>
              </div>
              
              {data.recentReviews.slice(0, showAllReviews ? undefined : 2).map((review) => (
                <div key={review.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{review.client}</div>
                      <div className="text-xs text-muted-foreground">
                        {review.property} • {review.type}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {review.date}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded italic">
                    <Quote className="h-3 w-3 inline mr-1" />
                    {review.comment}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-xs">
          <div className="text-center">
            <div className="font-semibold text-green-600">
              {data.rating.distribution[0].percentage}%
            </div>
            <div className="text-muted-foreground">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-600">
              {data.rating.distribution.slice(0, 2).reduce((sum, item) => sum + item.percentage, 0)}%
            </div>
            <div className="text-muted-foreground">4+ Stars</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientFeedback;
