import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import {
  XMarkIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CalendarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const getNavigationItems = (role: string) => {
  const commonItems = [
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
  ];

  const roleSpecificItems = {
    student: [
      { name: 'Attendance', href: '/attendance', icon: ClipboardDocumentCheckIcon },
      { name: 'Permissions', href: '/permissions', icon: DocumentTextIcon },
    ],
    faculty: [
      { name: 'Take Attendance', href: '/take-attendance', icon: ClipboardDocumentCheckIcon },
      { name: 'Manage Classes', href: '/manage-classes', icon: AcademicCapIcon },
      { name: 'Student List', href: '/students', icon: UserGroupIcon },
    ],
    admin: [
      { name: 'Users', href: '/users', icon: UserGroupIcon },
      { name: 'Classes', href: '/classes', icon: AcademicCapIcon },
      { name: 'Reports', href: '/reports', icon: ChartBarIcon },
      { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ],
  };

  return [...commonItems, ...(roleSpecificItems[role as keyof typeof roleSpecificItems] || [])];
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  
  if (!user) return null;
  
  const navigation = getNavigationItems(user.role);

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="/apollo-logo.svg"
                      alt="Apollo University"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={`
                                  group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                  ${location.pathname === item.href
                                    ? 'bg-gray-50 text-indigo-600'
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                  }
                                `}
                              >
                                <item.icon
                                  className={`h-6 w-6 shrink-0 ${
                                    location.pathname === item.href
                                      ? 'text-indigo-600'
                                      : 'text-gray-400 group-hover:text-indigo-600'
                                  }`}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/apollo-logo.svg"
              alt="Apollo University"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${location.pathname === item.href
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            location.pathname === item.href
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;