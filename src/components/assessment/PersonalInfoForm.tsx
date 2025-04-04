
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  age: z.string().transform(Number).refine(val => val >= 0 && val <= 120, 'Age must be between 0 and 120'),
  gender: z.string().min(1, 'Please select a gender'),
  idNumber: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email('Invalid email address').optional().or(z.literal('')),
  address: z.string().optional(),
  medicalHistory: z.string().optional(),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onNext: (data: PersonalInfoFormValues) => void;
  defaultValues?: Partial<PersonalInfoFormValues>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onNext, defaultValues = {} }) => {
  const form = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '', // Age is a string initially that gets transformed to number by zod
      gender: '',
      idNumber: '',
      contactPhone: '',
      contactEmail: '',
      address: '',
      medicalHistory: '',
      ...defaultValues,
    },
  });

  const onSubmit = (data: PersonalInfoFormValues) => {
    onNext(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
        <p className="text-gray-600">Please provide the patient's personal details</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age*</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ID or SSN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Home address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medicalHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Medical History</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Relevant medical history" 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end mt-8">
            <Button type="submit" className="bg-health-600 hover:bg-health-700">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
