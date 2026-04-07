import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { OutpassRequest } from '@/types/student';

const outpassSchema = z.object({
  reason: z.string().min(1, 'Reason is required'),
  fromDate: z.string(),
  toDate: z.string(),
});

type OutpassFormData = z.infer<typeof outpassSchema>;

const mockOutpasses: OutpassRequest[] = [
  {
    id: '1',
    reason: 'Medical Appointment',
    fromDate: '2023-11-20',
    toDate: '2023-11-20',
    status: 'approved',
  },
  {
    id: '2',
    reason: 'Family Function',
    fromDate: '2023-11-25',
    toDate: '2023-11-26',
    status: 'pending',
  },
];

export function StudentOutpass() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<OutpassFormData>({
    resolver: zodResolver(outpassSchema),
  });

  const onSubmit = (data: OutpassFormData) => {
    console.log('New outpass request:', data);
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
          <Title>Outpass Requests</Title>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Request'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                {...register('reason')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">From Date</label>
                <input
                  {...register('fromDate')}
                  type="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">To Date</label>
                <input
                  {...register('toDate')}
                  type="date"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <Button type="submit">Submit Request</Button>
          </form>
        )}

        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOutpasses.map((outpass) => (
                <tr key={outpass.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {outpass.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(outpass.fromDate).toLocaleDateString()} - {new Date(outpass.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${outpass.status === 'approved' ? 'bg-green-100 text-green-800' :
                        outpass.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {outpass.status.charAt(0).toUpperCase() + outpass.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}