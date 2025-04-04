
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Home } from 'lucide-react';

const AssessmentCompleted = () => {
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
    </Layout>
  );
};

export default AssessmentCompleted;
