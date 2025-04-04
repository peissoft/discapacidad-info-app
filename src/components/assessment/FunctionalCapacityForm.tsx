
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const ratingScale = [
  { value: '0', label: '0 - No difficulty (0-4%)' },
  { value: '1', label: '1 - Mild difficulty (5-24%)' },
  { value: '2', label: '2 - Moderate difficulty (25-49%)' },
  { value: '3', label: '3 - Severe difficulty (50-95%)' },
  { value: '4', label: '4 - Complete difficulty (96-100%)' },
  { value: '8', label: '8 - Not specified' },
  { value: '9', label: '9 - Not applicable' },
];

const functionalCapacitySchema = z.object({
  // Body Functions
  mentalFunctions: z.string().min(1, 'Please select a rating'),
  sensoryFunctions: z.string().min(1, 'Please select a rating'),
  voiceSpeechFunctions: z.string().min(1, 'Please select a rating'),
  cardiovascularFunctions: z.string().min(1, 'Please select a rating'),
  digestiveFunctions: z.string().min(1, 'Please select a rating'),
  movementFunctions: z.string().min(1, 'Please select a rating'),
  
  // Activity and Participation
  learning: z.string().min(1, 'Please select a rating'),
  communication: z.string().min(1, 'Please select a rating'),
  mobility: z.string().min(1, 'Please select a rating'),
  selfCare: z.string().min(1, 'Please select a rating'),
  domesticLife: z.string().min(1, 'Please select a rating'),
  interpersonalInteractions: z.string().min(1, 'Please select a rating'),
  majorLifeAreas: z.string().min(1, 'Please select a rating'),
  communityLife: z.string().min(1, 'Please select a rating'),
  
  additionalNotes: z.string().optional(),
});

type FunctionalCapacityFormValues = z.infer<typeof functionalCapacitySchema>;

interface FunctionalCapacityFormProps {
  onNext: (data: FunctionalCapacityFormValues) => void;
  onPrevious: () => void;
  defaultValues?: Partial<FunctionalCapacityFormValues>;
}

const FunctionalCapacityForm: React.FC<FunctionalCapacityFormProps> = ({ 
  onNext, 
  onPrevious,
  defaultValues = {} 
}) => {
  const form = useForm<FunctionalCapacityFormValues>({
    resolver: zodResolver(functionalCapacitySchema),
    defaultValues: {
      mentalFunctions: '',
      sensoryFunctions: '',
      voiceSpeechFunctions: '',
      cardiovascularFunctions: '',
      digestiveFunctions: '',
      movementFunctions: '',
      learning: '',
      communication: '',
      mobility: '',
      selfCare: '',
      domesticLife: '',
      interpersonalInteractions: '',
      majorLifeAreas: '',
      communityLife: '',
      additionalNotes: '',
      ...defaultValues,
    },
  });

  const onSubmit = (data: FunctionalCapacityFormValues) => {
    onNext(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Functional Capacity Assessment</h2>
        <p className="text-gray-600">Evaluate the patient's body functions and capabilities according to ICF</p>
      </div>

      <Card className="mb-4 border border-health-100">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Rating Scale</h3>
          <ul className="text-sm space-y-1">
            {ratingScale.map((item) => (
              <li key={item.value} className="flex">
                <span className="font-semibold w-8">{item.value}:</span>
                <span>{item.label.substring(4)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-health-800 mb-4">Body Functions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mentalFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mental Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sensoryFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sensory Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="voiceSpeechFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice and Speech Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardiovascularFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardiovascular Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="digestiveFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digestive Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="movementFunctions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movement Functions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h3 className="text-lg font-semibold text-health-800 mb-4">Activity and Participation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="learning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Learning and Applying Knowledge</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communication"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Communication</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selfCare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Self-Care</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="domesticLife"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domestic Life</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interpersonalInteractions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interpersonal Interactions</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="majorLifeAreas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major Life Areas (Education, Work)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="communityLife"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Community and Social Life</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ratingScale.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="additionalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any additional observations or notes" 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onPrevious}
            >
              Previous
            </Button>
            <Button type="submit" className="bg-health-600 hover:bg-health-700">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FunctionalCapacityForm;
