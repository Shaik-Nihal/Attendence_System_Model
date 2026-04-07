import { Card, Title, BarList } from '@tremor/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { ExamResult } from '@/types/student';

const mockResults: ExamResult[] = [
  {
    id: '1',
    subjectCode: 'CS101',
    subjectName: 'Introduction to Programming',
    marks: 85,
    totalMarks: 100,
    grade: 'A',
    semester: 1,
  },
  {
    id: '2',
    subjectCode: 'CS102',
    subjectName: 'Data Structures',
    marks: 92,
    totalMarks: 100,
    grade: 'A+',
    semester: 1,
  },
  {
    id: '3',
    subjectCode: 'CS103',
    subjectName: 'Database Management',
    marks: 78,
    totalMarks: 100,
    grade: 'B+',
    semester: 1,
  },
];

export function StudentResults() {
  const downloadResults = () => {
    // TODO: Implement PDF download
    console.log('Downloading results...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card>
        <div className="flex items-center justify-between">
          <Title>Examination Results</Title>
          <Button onClick={downloadResults}>Download PDF</Button>
        </div>

        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.subjectCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.subjectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.marks}/{result.totalMarks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {result.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <Title>Performance Analysis</Title>
        <BarList
          data={mockResults.map((result) => ({
            name: result.subjectName,
            value: (result.marks / result.totalMarks) * 100,
          }))}
          className="mt-6"
        />
      </Card>
    </motion.div>
  );
}