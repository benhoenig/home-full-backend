
import React from 'react';
import { Slider } from '@/components/ui/slider';

type RapportSectionProps = {
  rapport: number[];
  onRapportChange: (value: number[]) => void;
};

const RapportSection = ({ rapport, onRapportChange }: RapportSectionProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <p className="text-sm">Rapport :</p>
        <p className="text-sm font-medium">{rapport[0]}%</p>
      </div>
      <Slider value={rapport} onValueChange={onRapportChange} max={100} step={5} className="w-full" />
    </div>
  );
};

export default RapportSection;
