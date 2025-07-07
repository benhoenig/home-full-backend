import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ScriptEvaluationForm, { ScriptEvaluationData } from './ScriptEvaluationForm';
import { useToast } from '@/components/ui/use-toast';

type ScriptEvaluationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  scriptType: 'Owner Script' | 'Consulting Script' | 'Buyer Script';
};

const ScriptEvaluationDialog: React.FC<ScriptEvaluationDialogProps> = ({
  isOpen,
  onClose,
  scriptType
}) => {
  const { toast } = useToast();

  const handleSubmit = (data: ScriptEvaluationData) => {
    console.log('Script evaluation submitted:', data);
    
    // Show success message
    toast({
      title: "Evaluation Submitted",
      description: `${scriptType} evaluation recorded with score: ${data.averageScore}%`,
    });
    
    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] p-0">
        <ScriptEvaluationForm
          scriptType={scriptType}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ScriptEvaluationDialog; 