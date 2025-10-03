
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { FileSpreadsheet, Download, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SummaryFormProps {
  formData: {
    personalInfo: any;
    functionalCapacity: any;
    environmentalFactors: any;
  };
  onPrevious: () => void;
  onComplete: () => void;
}

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

const SummaryForm: React.FC<SummaryFormProps> = ({ formData, onPrevious, onComplete }) => {
  const { personalInfo, functionalCapacity, environmentalFactors } = formData;

  const handleComplete = () => {
    toast.success("Assessment completed and saved successfully!");
    onComplete();
  };

  const generateExcelData = () => {
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

  const handleExportExcel = () => {
    const data = generateExcelData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assessment');
    
    const fileName = `Assessment_${personalInfo.firstName}_${personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success("Assessment exported to Excel successfully!");
  };

  const handleExportCSV = () => {
    const data = generateExcelData();
    const csv = [
      ['Section', 'Field', 'Value'],
      ...data.map(row => [row.Section, row.Field, row.Value])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const fileName = `Assessment_${personalInfo.firstName}_${personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    
    toast.success("Assessment exported to CSV successfully!");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const data = generateExcelData();
    
    // Add title
    doc.setFontSize(18);
    doc.text('ICF Disability Assessment Report', 14, 20);
    
    // Add patient info
    doc.setFontSize(12);
    doc.text(`Patient: ${personalInfo.firstName} ${personalInfo.lastName}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37);
    
    // Add assessment results summary
    doc.setFontSize(14);
    doc.text('Assessment Summary', 14, 50);
    doc.setFontSize(11);
    doc.text(`Overall Disability Level: ${calculateDisabilityScore(functionalCapacity)}`, 14, 58);
    doc.text(`Environmental Context: ${evaluateEnvironmentalFactors(environmentalFactors)}`, 14, 65);
    
    // Create table with detailed data
    const tableData = data.map(row => [row.Section, row.Field, row.Value]);
    
    autoTable(doc, {
      startY: 75,
      head: [['Section', 'Field', 'Value']],
      body: tableData,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [76, 175, 80] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 60 },
        2: { cellWidth: 70 }
      },
      margin: { top: 75 }
    });
    
    const fileName = `Assessment_${personalInfo.firstName}_${personalInfo.lastName}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast.success("Assessment exported to PDF successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Assessment Summary</h2>
        <p className="text-gray-600">Review the collected information before finalizing</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="bg-health-50">
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p>{personalInfo.firstName} {personalInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p>{personalInfo.age}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="capitalize">{personalInfo.gender}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p>{personalInfo.contactPhone || 'Not provided'}</p>
            </div>
            {personalInfo.medicalHistory && (
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-500">Medical History</p>
                <p>{personalInfo.medicalHistory}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="bg-health-50">
          <CardTitle>Functional Capacity Summary</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-health-800">Body Functions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Mental Functions</p>
                <p>{mapRatingToText(functionalCapacity.mentalFunctions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sensory Functions</p>
                <p>{mapRatingToText(functionalCapacity.sensoryFunctions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Voice and Speech Functions</p>
                <p>{mapRatingToText(functionalCapacity.voiceSpeechFunctions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Cardiovascular Functions</p>
                <p>{mapRatingToText(functionalCapacity.cardiovascularFunctions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Digestive Functions</p>
                <p>{mapRatingToText(functionalCapacity.digestiveFunctions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Movement Functions</p>
                <p>{mapRatingToText(functionalCapacity.movementFunctions)}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="font-medium mb-2 text-health-800">Activity and Participation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Learning and Applying Knowledge</p>
                <p>{mapRatingToText(functionalCapacity.learning)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Communication</p>
                <p>{mapRatingToText(functionalCapacity.communication)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Mobility</p>
                <p>{mapRatingToText(functionalCapacity.mobility)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Self-Care</p>
                <p>{mapRatingToText(functionalCapacity.selfCare)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Domestic Life</p>
                <p>{mapRatingToText(functionalCapacity.domesticLife)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Interpersonal Interactions</p>
                <p>{mapRatingToText(functionalCapacity.interpersonalInteractions)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Major Life Areas</p>
                <p>{mapRatingToText(functionalCapacity.majorLifeAreas)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Community and Social Life</p>
                <p>{mapRatingToText(functionalCapacity.communityLife)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="bg-health-50">
          <CardTitle>Environmental Factors</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500 md:w-1/2">Products and Technology</p>
              <p className="md:w-1/2">{mapRatingToText(environmentalFactors.productsAndTechnology, true)}</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500 md:w-1/2">Natural Environment</p>
              <p className="md:w-1/2">{mapRatingToText(environmentalFactors.naturalEnvironment, true)}</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500 md:w-1/2">Support and Relationships</p>
              <p className="md:w-1/2">{mapRatingToText(environmentalFactors.supportAndRelationships, true)}</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500 md:w-1/2">Attitudes</p>
              <p className="md:w-1/2">{mapRatingToText(environmentalFactors.attitudes, true)}</p>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <p className="text-sm font-medium text-gray-500 md:w-1/2">Services and Policies</p>
              <p className="md:w-1/2">{mapRatingToText(environmentalFactors.servicesAndPolicies, true)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6 border-health-600">
        <CardHeader className="bg-health-100">
          <CardTitle>Disability Assessment Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Overall Disability Level</p>
              <p className="font-semibold text-lg text-health-800">{calculateDisabilityScore(functionalCapacity)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Environmental Context</p>
              <p className="font-semibold text-lg text-health-800">{evaluateEnvironmentalFactors(environmentalFactors)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
        >
          Previous
        </Button>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleExportPDF}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleExportExcel}
            className="flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleExportCSV}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button 
            type="button" 
            className="bg-health-600 hover:bg-health-700"
            onClick={handleComplete}
          >
            Complete Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;
