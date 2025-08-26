'use client';

import React,  { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApiLoadingStore } from '@/components/ApiLoading/ApiLoadingStore';
import toast from '@/utils/toast';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Eye, EyeOff } from 'react-feather';
import { useAuthStore } from './authStore';
import { useThemeStore } from '@/utils/useThemeStore';
import { themeConfig } from '@/utils/themeConfig';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
export default function LoginPage() {
  // STATE
   const [data, setData] = React.useState({ email: '', password: ''   });
  const [errors, setErrors] =  useState<any>({});
  const [isShowPassword, setShowPassword] = useState(false);

  // HOOKS
  const { showLoader, hideLoader } = useApiLoadingStore();
  const { theme } = useThemeStore();
  const themeClasses = themeConfig[theme];
   const login = useAuthStore((state: any) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  // LOGOUT ON PAGE LOAD
  useEffect(() => {
    logout();
  }, [logout]);

  // HANDLERS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '', alert: '' }));
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
     let _errors: any = {};
    if (!data.email) {
      _errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      _errors.email = 'Invalid email address';
    }
    if (!data.password) {
      _errors.password = 'Password is required';
    } else if (data.password.length < 6) {
      _errors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(_errors).length > 0) {
      setErrors(_errors);
      return false;
    }
    return true;
  };

const handleSubmit = async (e: any) => {
       console.log("test");
    e.preventDefault();
     if (!validate()) {
            return false;
        }
    showLoader();

    console.log("test2");

    // Replace this with your actual signIn function
   
      const response = await signIn('login', {
      email: data.email,
      password: data.password,
      login_with: 'PASSWORD',
      redirect: false,
    }).then(({ ok, error }: any) => {
      hideLoader();
      if (ok) {
        login({
          success: () => {
            
             void router.push('/user-products');
          },
        });
      } else {
        const _err = JSON.parse(error);

                setErrors({
                    alert: _err.message
                    // password: <PASSWORD>
                })
                toast({ message: _err.message, type: "error" });
      }
    });

      console.log(response)
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${themeClasses.background} ${themeClasses.text} px-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className={`w-full max-w-md sm:p-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl`}>
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Sign In</h2>
        <form className="space-y-7" onSubmit={handleSubmit} autoComplete="off">
          {/* Alert Message */}
          {errors.alert && (
            <div className="flex items-center bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300 border border-red-400 rounded-lg p-3 text-sm mb-2">
              <ExclamationTriangleIcon width={20} className="mr-2" />
              {errors.alert}
            </div>
          )}
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={data.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>
          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={isShowPassword ? 'text' : 'password'}
              required
              value={data.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              placeholder="Enter your password"
              className="mt-2 block w-full px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
            <button
              type="button"
              className="absolute right-4 top-11 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowPassword(!isShowPassword)}
              tabIndex={-1}
              aria-label={isShowPassword ? 'Hide password' : 'Show password'}
            >
              {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p id="password-error" className="text-red-600 text-xs mt-1">
                {errors.password}
              </p>
            )}
          </div>
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
