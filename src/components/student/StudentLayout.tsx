import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  HomeIcon,
  MegaphoneIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/student/profile', icon: UserIcon },
  { name: 'Results', href: '/student/results', icon: AcademicCapIcon },
  { name: 'Outpass', href: '/student/outpass', icon: DocumentTextIcon },
  { name: 'Grievances', href: '/student/grievances', icon: ChatBubbleLeftIcon },
  { name: 'Leave', href: '/student/leave', icon: CalendarIcon },
  { name: 'Announcements', href: '/student/announcements', icon: MegaphoneIcon },
  { name: 'Fee Payment', href: '/student/fees', icon: CurrencyRupeeIcon },
];

export function StudentLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      <motion.aside
        initial={{ width: 256 }}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900"
      >
        <div className="flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-white">Apollo University</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isSidebarOpen ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <item.icon className="mr-3 h-6 w-6" />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-700 p-4">
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full justify-center"
          >
            Logout
          </Button>
        </div>
      </motion.aside>

      <main className="flex-1 pl-[256px]">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}