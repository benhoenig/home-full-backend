import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X, Check } from 'lucide-react';

type ScriptEvaluationFormProps = {
  scriptType: 'Owner Script' | 'Consulting Script' | 'Buyer Script';
  onSubmit: (data: ScriptEvaluationData) => void;
  onCancel: () => void;
};

export type ScriptEvaluationData = {
  wording: number;
  tonality: number;
  rapport: number;
  averageScore: number;
  attachment?: File | null;
  remark: string;
};

const ScriptEvaluationForm: React.FC<ScriptEvaluationFormProps> = ({
  scriptType,
  onSubmit,
  onCancel
}) => {
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      wording,
      tonality,
      rapport,
      averageScore,
      attachment,
      remark
    });
  };
  
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">{scriptType} Evaluation</h2>
      
      <form onSubmit={handleSubmit}>
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
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={wording === 0 && tonality === 0 && rapport === 0}
            >
              <Check className="h-4 w-4 mr-1" />
              Submit Evaluation
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ScriptEvaluationForm; 