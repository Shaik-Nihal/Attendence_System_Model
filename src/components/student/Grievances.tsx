import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { Grievance } from '@/types/student';

const grievanceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
});

type GrievanceFormData = z.infer<typeof grievanceSchema>;

const mockGrievances: Grievance[] = [
  {
    id: '1',
    title: 'Library Access Issue',
    description: 'Unable to access the digital library resources',
    category: 'Academic',
    status: 'in-progress',
    createdAt: '2023-11-15',
  },
  {
    id: '2',
    title: 'Cafeteria Food Quality',
    description: 'Concerns about food quality in the campus cafeteria',
    category: 'Facilities',
    status: 'open',
    createdAt: '2023-11-14',
  },
];

const categories = [
  'Academic',
  'Administrative',
  'Facilities',
  'Technical',
  'Other',
];

export function StudentGrievances() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<GrievanceFormData>({
    resolver: zodResolver(grievanceSchema),
  });

  const onSubmit = (data: GrievanceFormData) => {
    console.log('New grievance:', data);
    setShowForm(false);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex items-center justify-between">
          <Title>Grievance Redressal</Title>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Grievance'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register('title')}
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                {...register('category')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <Button type="submit">Submit Grievance</Button>
          </form>
        )}

        <div className="mt-6">
          {mockGrievances.map((grievance) => (
            <div
              key={grievance.id}
              className="mb-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{grievance.title}</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${grievance.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    grievance.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'}`}
                >
                  {grievance.status.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{grievance.description}</p>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>Category: {grievance.category}</span>
                <span>Submitted: {new Date(grievance.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}