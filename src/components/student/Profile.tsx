import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { StudentDetails } from '@/types/student';

const profileSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(1),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const mockStudentDetails: StudentDetails = {
  id: '1',
  name: 'John Doe',
  rollNumber: 'AP2023001',
  department: 'Computer Science',
  semester: 4,
  email: 'john.doe@apollo.edu',
  phone: '1234567890',
  address: '123 Campus Road',
  dateOfBirth: '2000-01-01',
};

export function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: mockStudentDetails.email,
      phone: mockStudentDetails.phone,
      address: mockStudentDetails.address,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Updated profile:', data);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex items-center justify-between">
          <Title>Student Profile</Title>
          <Button
            variant="secondary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(mockStudentDetails).map(([key, value]) => (
                <div key={key} className="border-t border-gray-200 pt-4">
                  <dt className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Card>
    </motion.div>
  );
}