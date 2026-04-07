import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { LeaveApplication } from '@/types/student';

const leaveSchema = z.object({
  type: z.enum(['medical', 'personal', 'other']),
  fromDate: z.string(),
  toDate: z.string(),
  reason: z.string().min(1, 'Reason is required'),
});

type LeaveFormData = z.infer<typeof leaveSchema>;

const mockLeaves: LeaveApplication[] = [
  {
    id: '1',
    type: 'medical',
    fromDate: '2023-11-20',
    toDate: '2023-11-22',
    reason: 'Medical appointment and recovery',
    status: 'approved',
  },
  {
    id: '2',
    type: 'personal',
    fromDate: '2023-11-25',
    toDate: '2023-11-25',
    reason: 'Family function',
    status: 'pending',
  },
];

export function StudentLeave() {
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = (data: LeaveFormData) => {
    console.log('New leave application:', data);
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
          <Title>Leave Applications</Title>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Application'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Leave Type</label>
              <select
                {...register('type')}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="medical">Medical Leave</option>
                <option value="personal">Personal Leave</option>
                <option value="other">Other</option>
              </select>
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

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                {...register('reason')}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            <Button type="submit">Submit Application</Button>
          </form>
        )}

        <div className="mt-6">
          {mockLeaves.map((leave) => (
            <div
              key={leave.id}
              className="mb-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium capitalize">{leave.type} Leave</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                    leave.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}
                >
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{leave.reason}</p>
              <div className="mt-2 text-sm text-gray-500">
                {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}