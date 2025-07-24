
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-health-900">About ICF Assessment</h1>
        
        <Tabs defaultValue="icf" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="icf">ICF Framework</TabsTrigger>
            <TabsTrigger value="assessment">Assessment Process</TabsTrigger>
            <TabsTrigger value="domains">ICF Domains</TabsTrigger>
          </TabsList>
          
          <TabsContent value="icf" className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-health-800">International Classification of Functioning, Disability and Health</h2>
            <p className="mb-4">
              The International Classification of Functioning, Disability and Health, known more commonly as ICF, is a classification of health and health-related domains. 
              As the functioning and disability of an individual occurs in a context, ICF also includes a list of environmental factors.
            </p>
            <p className="mb-4">
              The ICF was officially endorsed by all 191 WHO Member States in the Fifty-fourth World Health Assembly on 22 May 2001 as the international standard to describe and measure health and disability.
            </p>
            <p>
              ICF is operationalized through the WHO Disability Assessment Schedule (WHODAS 2.0). WHODAS 2.0 was developed through a comprehensive set of international field trials and is linked to the theoretical model of the ICF.
            </p>
          </TabsContent>
          
          <TabsContent value="assessment" className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-health-800">Assessment Process</h2>
            <p className="mb-4">
              The ICF assessment process involves a comprehensive evaluation of an individual's functioning, disability, and contextual factors. The process typically includes:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Collection of personal and medical information</li>
              <li>Assessment of body functions and structures</li>
              <li>Evaluation of activities and participation</li>
              <li>Analysis of environmental factors (barriers and facilitators)</li>
              <li>Integration of findings to determine the level of disability</li>
              <li>Development of intervention plans based on assessment results</li>
            </ol>
            <p>
              The assessment is typically conducted by healthcare professionals, including physicians, physical therapists, occupational therapists, psychologists, and social workers, often working as a multidisciplinary team.
            </p>
          </TabsContent>
          
          <TabsContent value="domains" className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-health-800">ICF Domains</h2>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-health-700">Body Functions</h3>
                  <p>Physiological functions of body systems, including psychological functions.</p>
                  <p className="text-sm text-gray-600 mt-2">Examples: mental functions, sensory functions, voice and speech, cardiovascular, digestive, movement-related functions.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-health-700">Body Structures</h3>
                  <p>Anatomical parts of the body such as organs, limbs and their components.</p>
                  <p className="text-sm text-gray-600 mt-2">Examples: structures related to movement, structures of the nervous system, structures involved in voice and speech.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-health-700">Activities and Participation</h3>
                  <p>Execution of a task or action by an individual and involvement in life situations.</p>
                  <p className="text-sm text-gray-600 mt-2">Examples: learning and applying knowledge, general tasks and demands, communication, mobility, self-care, domestic life, interpersonal interactions, major life areas, community and social life.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-health-700">Environmental Factors</h3>
                  <p>Physical, social and attitudinal environment in which people live and conduct their lives.</p>
                  <p className="text-sm text-gray-600 mt-2">Examples: products and technology, natural environment, support and relationships, attitudes, services, systems and policies.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-health-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-health-800">Developer</h2>
          <p className="mb-2">
            <strong>Pedro Luis Sánchez Ortega</strong>
          </p>
          <p className="mb-4">
            <a href="https://investigacion.ubu.es/investigadores/35529/detalle" 
               className="text-health-600 hover:underline"
               target="_blank"
               rel="noopener noreferrer">
              Universidad de Burgos
            </a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/pedrosanchezortega/" 
               className="text-health-600 hover:underline"
               target="_blank"
               rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </p>
        </div>
        
        <div className="bg-health-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-health-800">References</h2>
          <ul className="space-y-2">
            <li>
              <a href="https://www.who.int/standards/classifications/international-classification-of-functioning-disability-and-health" 
                 className="text-health-600 hover:underline"
                 target="_blank"
                 rel="noopener noreferrer">
                WHO: International Classification of Functioning, Disability and Health (ICF)
              </a>
            </li>
            <li>
              <a href="https://www.who.int/publications/i/item/measuring-health-and-disability-manual-for-who-disability-assessment-schedule-(-whodas-2.0)" 
                 className="text-health-600 hover:underline"
                 target="_blank"
                 rel="noopener noreferrer">
                Measuring Health and Disability: Manual for WHO Disability Assessment Schedule (WHODAS 2.0)
              </a>
            </li>
            <li>
              <a href="https://www.who.int/classifications/icf/icfbeginnersguide.pdf" 
                 className="text-health-600 hover:underline"
                 target="_blank"
                 rel="noopener noreferrer">
                ICF Beginner's Guide
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default About;
