import { Card, Title } from '@tremor/react';
import { motion } from 'framer-motion';
import type { Announcement } from '@/types/student';

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Mid-Semester Examination Schedule',
    content: 'The mid-semester examinations will commence from December 1st, 2023. Please check the detailed schedule below.',
    category: 'Academic',
    date: '2023-11-15',
    important: true,
  },
  {
    id: '2',
    title: 'Annual Sports Meet Registration',
    content: 'Registration for the annual sports meet is now open. Students interested in participating should register by November 25th.',
    category: 'Sports',
    date: '2023-11-14',
    important: false,
  },
  {
    id: '3',
    title: 'Campus Maintenance Notice',
    content: 'The main library will be closed for maintenance on November 20th. Alternative study spaces will be available.',
    category: 'Facilities',
    date: '2023-11-13',
    important: true,
  },
];

export function StudentAnnouncements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <Title>Announcements</Title>

        <div className="mt-6 space-y-4">
          {mockAnnouncements.map((announcement) => (
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
              <p className="mt-2 text-sm text-gray-600">{announcement.content}</p>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                <span>Category: {announcement.category}</span>
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}