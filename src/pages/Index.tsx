
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, FileText, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-health-900 mb-6">
          ICF Disability Assessment
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Comprehensive evaluation based on the International Classification of Functioning, Disability and Health (ICF)
        </p>
        <div className="flex justify-center">
          <Link to="/assessment">
            <Button className="bg-health-600 hover:bg-health-700 text-lg px-8 py-6">
              Start New Assessment
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-health-100">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-health-50 p-4 rounded-full mb-4">
              <ClipboardCheck className="h-10 w-10 text-health-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Standardized Assessment</h3>
            <p className="text-gray-600">
              Based on the WHO's ICF framework for measuring health and disability
            </p>
          </CardContent>
        </Card>

        <Card className="border-health-100">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-health-50 p-4 rounded-full mb-4">
              <FileText className="h-10 w-10 text-health-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Evaluation</h3>
            <p className="text-gray-600">
              Covers body functions, activities, participation, and environmental factors
            </p>
          </CardContent>
        </Card>

        <Card className="border-health-100">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-health-50 p-4 rounded-full mb-4">
              <Users className="h-10 w-10 text-health-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Person-Centered Approach</h3>
            <p className="text-gray-600">
              Considers individual context and environmental factors in disability assessment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-4xl bg-health-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-health-800">About ICF Framework</h2>
        <p className="mb-4">
          The International Classification of Functioning, Disability and Health (ICF) is the WHO framework for measuring health and disability at both individual and population levels.
        </p>
        <p className="mb-4">
          The ICF was officially endorsed by all 191 WHO Member States in the Fifty-fourth World Health Assembly on 22 May 2001 as the international standard to describe and measure health and disability.
        </p>
        <p>
          This assessment tool applies the ICF principles to evaluate functional status, identify barriers and facilitators, and provide comprehensive disability assessment.
        </p>
      </div>
    </div>
  );
};

export default Index;
