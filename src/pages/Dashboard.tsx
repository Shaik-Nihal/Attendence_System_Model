import { useAuthStore } from '../store/authStore';

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Dashboard cards will be added here based on user role */}
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Your personalized dashboard is being set up. Check back soon for more features!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;