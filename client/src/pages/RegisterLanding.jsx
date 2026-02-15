import React from 'react';
import { Link } from 'react-router-dom';
import { Users, User } from 'lucide-react';

const RegisterLanding = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
             <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Join CampusPulse</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Select your account type to get started
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
                <Link to="/register/student" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition transform hover:-translate-y-1">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-white/80 group-hover:text-white" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">I am a Student</span>
                        <span className="text-white/80 font-normal">Register to attend events</span>
                    </div>
                </Link>

                <Link to="/register/club-head" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-indigo-50 hover:bg-indigo-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition transform hover:-translate-y-1">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <Users className="h-5 w-5 text-primary group-hover:text-primary/80 dark:text-white" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-bold">I am a Club Head</span>
                        <span className="text-primary/70 font-normal dark:text-gray-300">Register to create events</span>
                    </div>
                </Link>
                
                <div className="text-center mt-4">
                    <Link to="/login" className="font-medium text-primary hover:text-opacity-80">
                        Already have an account? Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterLanding;
