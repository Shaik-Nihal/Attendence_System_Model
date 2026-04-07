import { Role } from '../../types/user';
import {
  AcademicCapIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface RoleSelectionProps {
  selectedRole: Role | null;
  onRoleSelect: (role: Role) => void;
}

const roles = [
  {
    id: 'student',
    title: 'Student',
    icon: AcademicCapIcon,
    description: 'Access your courses, attendance, and grades',
  },
  {
    id: 'faculty',
    title: 'Faculty',
    icon: UserGroupIcon,
    description: 'Manage classes and student attendance',
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: UserIcon,
    description: 'System administration and management',
  },
] as const;

const RoleSelection = ({ selectedRole, onRoleSelect }: RoleSelectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
      {roles.map((role) => (
        <motion.button
          key={role.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleSelect(role.id as Role)}
          className={`${
            selectedRole === role.id
              ? 'border-indigo-600 ring-2 ring-indigo-600'
              : 'border-gray-200 hover:border-indigo-400'
          } flex flex-col items-center justify-center rounded-lg border-2 bg-white p-6 text-center shadow-sm transition-all duration-200`}
        >
          <role.icon
            className={`h-12 w-12 ${
              selectedRole === role.id ? 'text-indigo-600' : 'text-gray-400'
            }`}
          />
          <h3 className="mt-4 text-lg font-medium text-gray-900">{role.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{role.description}</p>
        </motion.button>
      ))}
    </div>
  );
};

export default RoleSelection;