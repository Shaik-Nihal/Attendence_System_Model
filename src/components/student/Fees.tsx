import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { FeePayment } from '@/types/student';

const mockFeePayments: FeePayment[] = [
  {
    id: '1',
    semester: 4,
    amount: 50000,
    dueDate: '2023-12-01',
    status: 'pending',
  },
  {
    id: '2',
    semester: 3,
    amount: 50000,
    dueDate: '2023-08-01',
    status: 'paid',
    transactionId: 'TXN123456',
    paidDate: '2023-07-25',
  },
];

export function StudentFees() {
  const handlePayment = (feeId: string) => {
    console.log('Processing payment for:', feeId);
    // TODO: Implement payment gateway integration
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <Title>Fee Payments</Title>

        <div className="mt-6">
          {mockFeePayments.map((fee) => (
            <div
              key={fee.id}
              className="mb-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Semester {fee.semester} Fees</h3>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${fee.status === 'paid' ? 'bg-green-100 text-green-800' :
                    fee.status === 'overdue' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}
                >
                  {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium">₹{fee.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Due Date</p>
                  <p className="font-medium">{new Date(fee.dueDate).toLocaleDateString() }</p>
                </div>
                {fee.status === 'paid' && (
                  <>
                    <div>
                      <p className="text-gray-500">Transaction ID</p>
                      <p className="font-medium">{fee.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Paid Date</p>
                      <p className="font-medium">{new Date(fee.paidDate!).toLocaleDateString()}</p>
                    </div>
                  </>
                )}
              </div>

              {fee.status === 'pending' && (
                <div className="mt-4">
                  <Button onClick={() => handlePayment(fee.id)}>Pay Now</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}