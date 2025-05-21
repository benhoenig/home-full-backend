import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

const MediaTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Thumbnail Image</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Image className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag and drop an image, or click to browse</p>
              <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Listing Photos</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Image className="h-10 w-10 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag and drop photos, or click to browse</p>
              <p className="text-xs text-gray-500">You can upload multiple photos</p>
              <Button variant="outline" size="sm" className="mt-2">Browse Files</Button>
            </div>
            
            <div className="mt-4 grid grid-cols-4 gap-4">
              {/* Placeholder for photo thumbnails */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaTab; 