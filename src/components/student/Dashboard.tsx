import { Card, Title, BarChart, DonutChart } from '@tremor/react';
import { motion } from 'framer-motion';

const attendanceData = [
  {
    subject: 'Mathematics',
    attended: 85,
    total: 100,
  },
  {
    subject: 'Physics',
    attended: 78,
    total: 100,
  },
  {
    subject: 'Chemistry',
    attended: 92,
    total: 100,
  },
];

const recentAnnouncements = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule',
    date: '2023-11-15',
    important: true,
  },
  {
    id: '2',
    title: 'Annual Sports Meet Registration',
    date: '2023-11-14',
    important: false,
  },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <Card>
          <Title>Attendance Overview</Title>
          <DonutChart
            className="mt-6"
            data={attendanceData}
            category="attended"
            index="subject"
            valueFormatter={(value) => `${value}%`}
            colors={['blue', 'cyan', 'indigo']}
          />
        </Card>

        <Card>
          <Title>Recent Announcements</Title>
          <div className="mt-4 space-y-4">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="rounded-lg border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{announcement.title}</h3>
                  {announcement.important && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                      Important
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <Title>Quick Actions</Title>
          <div className="mt-4 grid gap-4">
            <button className="rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <h3 className="font-medium">Apply for Leave</h3>
              <p className="mt-1 text-sm text-gray-500">
                Submit a new leave application
              </p>
            </button>
            <button className="rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <h3 className="font-medium">Request Outpass</h3>
              <p className="mt-1 text-sm text-gray-500">
                Create a new outpass request
              </p>
            </button>
            <button className="rounded-lg border border-gray-200 p-4 text-left hover:bg-gray-50">
              <h3 className="font-medium">View Results</h3>
              <p className="mt-1 text-sm text-gray-500">
                Check your examination results
              </p>
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}