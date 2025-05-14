import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
type MainInfoSectionProps = {
  budget: string | number;
  schedule: string;
  painPoint: string;
  onBudgetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onScheduleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPainPointChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
const MainInfoSection = ({
  budget,
  schedule,
  painPoint,
  onBudgetChange,
  onScheduleChange,
  onPainPointChange
}: MainInfoSectionProps) => {
  return <>
      <div>
        <p className="text-sm mb-1">Budget :</p>
        <Input type="text" value={budget} onChange={onBudgetChange} className="text-xl font-medium bg-slate-50" />
      </div>
      <div>
        <p className="text-sm mb-1">Schedule :</p>
        <Input type="text" placeholder="Enter schedule details" value={schedule} onChange={onScheduleChange} className="bg-slate-50" />
      </div>
      <div>
        <p className="text-sm mb-1">Pain Point :</p>
        <Textarea placeholder="Describe pain points here" value={painPoint} onChange={onPainPointChange} className="w-full bg-slate-50" />
      </div>
      <div>
        <p className="text-sm mb-1">Remark :</p>
        <Textarea placeholder="Add remarks here..." className="w-full h-24 bg-slate-50" />
      </div>
    </>;
};
export default MainInfoSection;