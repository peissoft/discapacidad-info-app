
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Home, FileSpreadsheet, Download } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

const AssessmentCompleted = () => {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    // Recuperar los datos del assessment desde localStorage
    const savedFormData = localStorage.getItem('assessmentFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Helper function to map rating values to text descriptions
  const mapRatingToText = (rating: string, isEnvironmental = false) => {
    if (isEnvironmental) {
      const numRating = parseInt(rating);
      if (numRating > 0) return `+${numRating} (Facilitator)`;
      if (numRating < 0) return `${numRating} (Barrier)`;
      return "0 (No impact)";
    }

    const ratings: Record<string, string> = {
      "0": "No difficulty (0-4%)",
      "1": "Mild difficulty (5-24%)",
      "2": "Moderate difficulty (25-49%)",
      "3": "Severe difficulty (50-95%)",
      "4": "Complete difficulty (96-100%)",
      "8": "Not specified",
      "9": "Not applicable",
    };
    return ratings[rating] || rating;
  };

  // Helper function to calculate general disability score
  const calculateDisabilityScore = (functionalCapacity: any) => {
    const validRatings = Object.values(functionalCapacity).filter(
      (val: any) => typeof val === 'string' && !isNaN(parseInt(val)) && parseInt(val) >= 0 && parseInt(val) <= 4
    ) as string[];

    if (validRatings.length === 0) return "Not available";
    
    const sum = validRatings.reduce((acc, val) => acc + parseInt(val), 0);
    const average = sum / validRatings.length;
    
    // Convert to percentage
    const percentage = (average / 4) * 100;
    
    // Categorize disability
    if (percentage < 5) return "No disability (0-4%)";
    if (percentage < 25) return "Mild disability (5-24%)";
    if (percentage < 50) return "Moderate disability (25-49%)";
    if (percentage < 96) return "Severe disability (50-95%)";
    return "Complete disability (96-100%)";
  };

  // Function to determine if environmental factors are generally supportive
  const evaluateEnvironmentalFactors = (environmentalFactors: any) => {
    const factorValues = [
      'productsAndTechnology', 
      'naturalEnvironment', 
      'supportAndRelationships', 
      'attitudes', 
      'servicesAndPolicies'
    ].map(key => environmentalFactors[key])
      .filter(val => val && val !== '8' && val !== '9')
      .map(val => parseInt(val));
    
    if (factorValues.length === 0) return "Not available";
    
    const average = factorValues.reduce((acc, val) => acc + val, 0) / factorValues.length;
    
    if (average > 2) return "Highly supportive environment";
    if (average > 0) return "Moderately supportive environment";
    if (average === 0) return "Neutral environment";
    if (average > -2) return "Mildly challenging environment";
    return "Significantly challenging environment";
  };

  const generateExcelData = () => {
    if (!formData) return [];
    
    const { personalInfo, functionalCapacity, environmentalFactors } = formData;
    
    return [
      // Patient Information
      { Section: 'Patient Information', Field: 'Name', Value: `${personalInfo.firstName} ${personalInfo.lastName}` },
      { Section: 'Patient Information', Field: 'Age', Value: personalInfo.age },
      { Section: 'Patient Information', Field: 'Gender', Value: personalInfo.gender },
      { Section: 'Patient Information', Field: 'Contact', Value: personalInfo.contactPhone || 'Not provided' },
      { Section: 'Patient Information', Field: 'Medical History', Value: personalInfo.medicalHistory || 'Not provided' },
      
      // Body Functions
      { Section: 'Body Functions', Field: 'Mental Functions', Value: mapRatingToText(functionalCapacity.mentalFunctions) },
      { Section: 'Body Functions', Field: 'Sensory Functions', Value: mapRatingToText(functionalCapacity.sensoryFunctions) },
      { Section: 'Body Functions', Field: 'Voice and Speech Functions', Value: mapRatingToText(functionalCapacity.voiceSpeechFunctions) },
      { Section: 'Body Functions', Field: 'Cardiovascular Functions', Value: mapRatingToText(functionalCapacity.cardiovascularFunctions) },
      { Section: 'Body Functions', Field: 'Digestive Functions', Value: mapRatingToText(functionalCapacity.digestiveFunctions) },
      { Section: 'Body Functions', Field: 'Movement Functions', Value: mapRatingToText(functionalCapacity.movementFunctions) },
      
      // Activity and Participation
      { Section: 'Activity and Participation', Field: 'Learning and Applying Knowledge', Value: mapRatingToText(functionalCapacity.learning) },
      { Section: 'Activity and Participation', Field: 'Communication', Value: mapRatingToText(functionalCapacity.communication) },
      { Section: 'Activity and Participation', Field: 'Mobility', Value: mapRatingToText(functionalCapacity.mobility) },
      { Section: 'Activity and Participation', Field: 'Self-Care', Value: mapRatingToText(functionalCapacity.selfCare) },
      { Section: 'Activity and Participation', Field: 'Domestic Life', Value: mapRatingToText(functionalCapacity.domesticLife) },
      { Section: 'Activity and Participation', Field: 'Interpersonal Interactions', Value: mapRatingToText(functionalCapacity.interpersonalInteractions) },
      { Section: 'Activity and Participation', Field: 'Major Life Areas', Value: mapRatingToText(functionalCapacity.majorLifeAreas) },
      { Section: 'Activity and Participation', Field: 'Community and Social Life', Value: mapRatingToText(functionalCapacity.communityLife) },
      
      // Environmental Factors
      { Section: 'Environmental Factors', Field: 'Products and Technology', Value: mapRatingToText(environmentalFactors.productsAndTechnology, true) },
      { Section: 'Environmental Factors', Field: 'Natural Environment', Value: mapRatingToText(environmentalFactors.naturalEnvironment, true) },
      { Section: 'Environmental Factors', Field: 'Support and Relationships', Value: mapRatingToText(environmentalFactors.supportAndRelationships, true) },
      { Section: 'Environmental Factors', Field: 'Attitudes', Value: mapRatingToText(environmentalFactors.attitudes, true) },
      { Section: 'Environmental Factors', Field: 'Services and Policies', Value: mapRatingToText(environmentalFactors.servicesAndPolicies, true) },
      
      // Assessment Results
      { Section: 'Assessment Results', Field: 'Overall Disability Level', Value: calculateDisabilityScore(functionalCapacity) },
      { Section: 'Assessment Results', Field: 'Environmental Context', Value: evaluateEnvironmentalFactors(environmentalFactors) },
    ];
  };

  const handleGeneratePDF = () => {
    if (!formData) {
      toast.error("No assessment data found. Please complete a new assessment.");
      return;
    }
    toast.success("PDF generation would be implemented here!");
  };

  const handleExportExcel = () => {
    if (!formData) {
      toast.error("No assessment data found. Please complete a new assessment.");
      return;
    }
    
    const data = generateExcelData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assessment');
    
    const fileName = `Assessment_${formData.personalInfo.firstName}_${formData.personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success("Assessment exported to Excel successfully!");
  };

  const handleExportCSV = () => {
    if (!formData) {
      toast.error("No assessment data found. Please complete a new assessment.");
      return;
    }
    
    const data = generateExcelData();
    const csv = [
      ['Section', 'Field', 'Value'],
      ...data.map(row => [row.Section, row.Field, row.Value])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const fileName = `Assessment_${formData.personalInfo.firstName}_${formData.personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    
    toast.success("Assessment exported to CSV successfully!");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-24 w-24 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Assessment Completed Successfully</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Thank you for completing the ICF disability assessment. The information has been processed and saved.
        </p>
        
        <div className="p-6 bg-health-50 rounded-lg mb-10">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <ul className="text-left space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-health-600">•</span>
              <span>A healthcare professional will review the assessment results.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-health-600">•</span>
              <span>The results will help determine appropriate services and support based on the identified needs.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-health-600">•</span>
              <span>A formal report will be generated for medical and administrative purposes.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-health-600">•</span>
              <span>You may be contacted for additional information or follow-up assessment if needed.</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleGeneratePDF}
              className="flex items-center gap-2"
            >
              <FileText size={18} />
              Generar PDF
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleExportCSV}
              className="flex items-center gap-2"
            >
              <Download size={18} />
              Exportar a CSV
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleExportExcel}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet size={18} />
              Exportar a Excel
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home size={18} />
                Return to Home
              </Button>
            </Link>
            
            <Link to="/assessment">
              <Button className="bg-health-600 hover:bg-health-700 flex items-center gap-2">
                <FileText size={18} />
                Start New Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssessmentCompleted;
