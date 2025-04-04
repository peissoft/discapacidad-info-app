
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center w-full mb-8 max-w-3xl mx-auto">
      {steps.map((step, index) => (
        <div
          key={index}
          className={cn(
            "step-item",
            currentStep === index && "active",
            currentStep > index && "complete"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center z-10 relative",
              currentStep === index 
                ? "bg-white border-2 border-health-600 text-health-600" 
                : currentStep > index
                  ? "bg-health-600 text-white"
                  : "bg-white border border-gray-300"
            )}
          >
            {currentStep > index ? (
              <Check className="w-5 h-5" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <p className="text-xs mt-1 text-gray-600">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
