export interface StudentDetails {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export interface ExamResult {
  id: string;
  subjectCode: string;
  subjectName: string;
  marks: number;
  totalMarks: number;
  grade: string;
  semester: number;
}

export interface OutpassRequest {
  id: string;
  reason: string;
  fromDate: string;
  toDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

export interface LeaveApplication {
  id: string;
  type: 'medical' | 'personal' | 'other';
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  documents?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  important: boolean;
}

export interface FeePayment {
  id: string;
  semester: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  transactionId?: string;
  paidDate?: string;
}