
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
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const environmentalFactorsSchema = z.object({
  productsAndTechnology: z.string().min(1, 'Please select a rating'),
  naturalEnvironment: z.string().min(1, 'Please select a rating'),
  supportAndRelationships: z.string().min(1, 'Please select a rating'),
  attitudes: z.string().min(1, 'Please select a rating'),
  servicesAndPolicies: z.string().min(1, 'Please select a rating'),
  environmentalNotes: z.string().optional(),
});

type EnvironmentalFactorsFormValues = z.infer<typeof environmentalFactorsSchema>;

interface EnvironmentalFactorsFormProps {
  onNext: (data: EnvironmentalFactorsFormValues) => void;
  onPrevious: () => void;
  defaultValues?: Partial<EnvironmentalFactorsFormValues>;
}

const EnvironmentalFactorsForm: React.FC<EnvironmentalFactorsFormProps> = ({
  onNext,
  onPrevious,
  defaultValues = {},
}) => {
  const form = useForm<EnvironmentalFactorsFormValues>({
    resolver: zodResolver(environmentalFactorsSchema),
    defaultValues: {
      productsAndTechnology: '',
      naturalEnvironment: '',
      supportAndRelationships: '',
      attitudes: '',
      servicesAndPolicies: '',
      environmentalNotes: '',
      ...defaultValues,
    },
  });

  const onSubmit = (data: EnvironmentalFactorsFormValues) => {
    onNext(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Environmental Factors Assessment</h2>
        <p className="text-gray-600">Evaluate the environmental factors affecting the patient</p>
      </div>

      <Card className="mb-4 border border-health-100">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Rating Scale for Environmental Factors</h3>
          <p className="text-sm mb-2">Environmental factors can be barriers or facilitators:</p>
          <ul className="text-sm space-y-1">
            <li className="flex">
              <span className="font-semibold w-24">Barriers:</span>
              <span>Use .0 to .4 scale (higher numbers = greater barrier)</span>
            </li>
            <li className="flex">
              <span className="font-semibold w-24">Facilitators:</span>
              <span>Use +0 to +4 scale (higher numbers = greater facilitator)</span>
            </li>
            <li className="flex">
              <span className="font-semibold w-24">8:</span>
              <span>Not specified</span>
            </li>
            <li className="flex">
              <span className="font-semibold w-24">9:</span>
              <span>Not applicable</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productsAndTechnology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Products and Technology</FormLabel>
                <FormDescription>
                  Assistive devices, medications, equipment that affect daily life
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">+4 Complete facilitator</SelectItem>
                    <SelectItem value="3">+3 Substantial facilitator</SelectItem>
                    <SelectItem value="2">+2 Moderate facilitator</SelectItem>
                    <SelectItem value="1">+1 Mild facilitator</SelectItem>
                    <SelectItem value="0">0 No barrier or facilitator</SelectItem>
                    <SelectItem value="-1">-1 Mild barrier</SelectItem>
                    <SelectItem value="-2">-2 Moderate barrier</SelectItem>
                    <SelectItem value="-3">-3 Substantial barrier</SelectItem>
                    <SelectItem value="-4">-4 Complete barrier</SelectItem>
                    <SelectItem value="8">8 Not specified</SelectItem>
                    <SelectItem value="9">9 Not applicable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="naturalEnvironment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Natural Environment</FormLabel>
                <FormDescription>
                  Geography, climate, light, sound, and environmental factors
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">+4 Complete facilitator</SelectItem>
                    <SelectItem value="3">+3 Substantial facilitator</SelectItem>
                    <SelectItem value="2">+2 Moderate facilitator</SelectItem>
                    <SelectItem value="1">+1 Mild facilitator</SelectItem>
                    <SelectItem value="0">0 No barrier or facilitator</SelectItem>
                    <SelectItem value="-1">-1 Mild barrier</SelectItem>
                    <SelectItem value="-2">-2 Moderate barrier</SelectItem>
                    <SelectItem value="-3">-3 Substantial barrier</SelectItem>
                    <SelectItem value="-4">-4 Complete barrier</SelectItem>
                    <SelectItem value="8">8 Not specified</SelectItem>
                    <SelectItem value="9">9 Not applicable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="supportAndRelationships"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support and Relationships</FormLabel>
                <FormDescription>
                  Practical and emotional support from family, friends, and professionals
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">+4 Complete facilitator</SelectItem>
                    <SelectItem value="3">+3 Substantial facilitator</SelectItem>
                    <SelectItem value="2">+2 Moderate facilitator</SelectItem>
                    <SelectItem value="1">+1 Mild facilitator</SelectItem>
                    <SelectItem value="0">0 No barrier or facilitator</SelectItem>
                    <SelectItem value="-1">-1 Mild barrier</SelectItem>
                    <SelectItem value="-2">-2 Moderate barrier</SelectItem>
                    <SelectItem value="-3">-3 Substantial barrier</SelectItem>
                    <SelectItem value="-4">-4 Complete barrier</SelectItem>
                    <SelectItem value="8">8 Not specified</SelectItem>
                    <SelectItem value="9">9 Not applicable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attitudes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Attitudes</FormLabel>
                <FormDescription>
                  Social attitudes, norms, and beliefs that influence behavior
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">+4 Complete facilitator</SelectItem>
                    <SelectItem value="3">+3 Substantial facilitator</SelectItem>
                    <SelectItem value="2">+2 Moderate facilitator</SelectItem>
                    <SelectItem value="1">+1 Mild facilitator</SelectItem>
                    <SelectItem value="0">0 No barrier or facilitator</SelectItem>
                    <SelectItem value="-1">-1 Mild barrier</SelectItem>
                    <SelectItem value="-2">-2 Moderate barrier</SelectItem>
                    <SelectItem value="-3">-3 Substantial barrier</SelectItem>
                    <SelectItem value="-4">-4 Complete barrier</SelectItem>
                    <SelectItem value="8">8 Not specified</SelectItem>
                    <SelectItem value="9">9 Not applicable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicesAndPolicies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services and Policies</FormLabel>
                <FormDescription>
                  Access to healthcare, social services, and public policies
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="4">+4 Complete facilitator</SelectItem>
                    <SelectItem value="3">+3 Substantial facilitator</SelectItem>
                    <SelectItem value="2">+2 Moderate facilitator</SelectItem>
                    <SelectItem value="1">+1 Mild facilitator</SelectItem>
                    <SelectItem value="0">0 No barrier or facilitator</SelectItem>
                    <SelectItem value="-1">-1 Mild barrier</SelectItem>
                    <SelectItem value="-2">-2 Moderate barrier</SelectItem>
                    <SelectItem value="-3">-3 Substantial barrier</SelectItem>
                    <SelectItem value="-4">-4 Complete barrier</SelectItem>
                    <SelectItem value="8">8 Not specified</SelectItem>
                    <SelectItem value="9">9 Not applicable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="environmentalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Additional notes about environmental factors" 
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

export default EnvironmentalFactorsForm;
