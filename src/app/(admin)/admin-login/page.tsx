'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApiLoadingStore } from '@/components/ApiLoading/ApiLoadingStore';
import toast from '@/utils/toast';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/ui/guest/Login/authStore';
import { useThemeStore } from '@/utils/useThemeStore';
import { themeConfig } from '@/utils/themeConfig';

export default function AdminLoginPage() {
  // STATE
  const [data, setData] = React.useState({ user_id: '' });
  const [errors, setErrors] = useState<any>({});

  // HOOKS
  const { showLoader, hideLoader } = useApiLoadingStore();
  const { theme } = useThemeStore();
  const themeClasses = themeConfig[theme];
  const loginAdmin = useAuthStore((state: any) => state.loginAdmin);
  const logoutAdmin = useAuthStore((state: any) => state.logoutAdmin);
  const router = useRouter();

  // LOGOUT ON PAGE LOAD
  useEffect(() => {
    logoutAdmin();
  }, [logoutAdmin]);

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '', alert: '' }));
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let _errors: any = {};
    if (!data.user_id) {
      _errors.user_id = 'User ID is required';
    } else if (!/^\d+$/.test(data.user_id)) {
      _errors.user_id = 'User ID must be a number';
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) {
      return false;
    }
    showLoader();

    loginAdmin(data, {
      success: () => {
        hideLoader();
        void router.push('/admin-dashboard');
      },
      error: (response) => {
        hideLoader();
        setErrors({
          alert: response.message
        });
        toast({ message: response.message, type: "error" });
      }
    });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text} px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className={`w-full max-w-md sm:p-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl`}>
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Admin Login</h2>
        <form className="space-y-7" onSubmit={handleSubmit} autoComplete="off">
          {/* Alert Message */}
          {errors.alert && (
            <div className="flex items-center bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300 border border-red-400 rounded-lg p-3 text-sm mb-2">
              <ExclamationTriangleIcon width={20} className="mr-2" />
              {errors.alert}
            </div>
          )}
          {/* User ID Field */}
          <div>
            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin User ID
            </label>
            <input
              id="user_id"
              name="user_id"
              type="number"
              required
              value={data.user_id}
              onChange={handleChange}
              aria-invalid={!!errors.user_id}
              aria-describedby={errors.user_id ? 'user_id-error' : undefined}
              placeholder="Enter admin user ID"
              className="mt-2 block w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
            {errors.user_id && (
              <p id="user_id-error" className="text-red-600 text-xs mt-1">
                {errors.user_id}
              </p>
            )}
          </div>
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Admin Sign In
          </button>
          {/* Back to User Login */}
          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              Back to User Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
