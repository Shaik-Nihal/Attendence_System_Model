import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Role } from '../types/user';
import RoleSelection from '../components/auth/RoleSelection';
import LoginForm from '../components/auth/LoginForm';
import { motion } from 'framer-motion';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (data: { email: string; password: string }) => {
    if (!selectedRole) return;

    setIsLoading(true);
    setError(undefined);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (data.password !== 'password1') {
        throw new Error('Invalid credentials');
      }

      const mockUser = {
        id: '1',
        name: selectedRole === 'student' ? 'John Student' : 
              selectedRole === 'faculty' ? 'Dr. Smith' : 'Admin User',
        email: data.email,
        role: selectedRole,
        phoneNumber: '1234567890',
      };
      
      const mockToken = 'mock-jwt-token';
      login(mockUser, mockToken);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              src="/apollo-logo.svg"
              className="mx-auto h-20 w-auto"
              alt="Apollo University"
            />
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
            >
              Welcome to <span className="font-serif italic">Apollo</span> University
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 text-center text-sm text-gray-600"
            >
              Please select your role to continue
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 w-full max-w-4xl"
          >
            <RoleSelection
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
          </motion.div>

          {selectedRole && (
            <LoginForm
              role={selectedRole}
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;