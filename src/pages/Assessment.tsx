
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import StepIndicator from '@/components/StepIndicator';
import PersonalInfoForm from '@/components/assessment/PersonalInfoForm';
import FunctionalCapacityForm from '@/components/assessment/FunctionalCapacityForm';
import EnvironmentalFactorsForm from '@/components/assessment/EnvironmentalFactorsForm';
import SummaryForm from '@/components/assessment/SummaryForm';

const STEPS = [
  "Personal Information",
  "Functional Capacity",
  "Environmental Factors",
  "Summary"
];

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {},
    functionalCapacity: {},
    environmentalFactors: {},
  });
  const navigate = useNavigate();

  const handleNext = (stepData: any) => {
    let updatedData = { ...formData };
    
    switch (currentStep) {
      case 0:
        updatedData.personalInfo = stepData;
        break;
      case 1:
        updatedData.functionalCapacity = stepData;
        break;
      case 2:
        updatedData.environmentalFactors = stepData;
        break;
      default:
        break;
    }
    
    setFormData(updatedData);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    // In a real application, we would save the assessment data to a database here
    console.log('Assessment completed with data:', formData);
    navigate('/assessment/completed');
  };

  return (
    <Layout>
      <div className="mb-12">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
        
        {currentStep === 0 && (
          <PersonalInfoForm 
            onNext={handleNext} 
            defaultValues={formData.personalInfo} 
          />
        )}
        
        {currentStep === 1 && (
          <FunctionalCapacityForm 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            defaultValues={formData.functionalCapacity} 
          />
        )}
        
        {currentStep === 2 && (
          <EnvironmentalFactorsForm 
            onNext={handleNext} 
            onPrevious={handlePrevious}
            defaultValues={formData.environmentalFactors} 
          />
        )}
        
        {currentStep === 3 && (
          <SummaryForm 
            formData={formData}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
          />
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
