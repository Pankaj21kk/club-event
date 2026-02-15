import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <Calendar className="h-8 w-8" />
              <span>CampusPulse</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
                <>
                    <span className="text-gray-700 hidden sm:block">Hello, {user.name}</span>
                    {role === 'club-head' && (
                        <Link 
                        to="/create" 
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                        <PlusCircle className="h-5 w-5" />
                        <span className="hidden sm:inline">Create Event</span>
                        </Link>
                    )}
                    <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 font-medium">Logout</button>
                </>
            ) : (
                <div className="flex gap-4">
                    <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-800">Login</Link>
                    <Link to="/register/student" className="text-gray-600 font-medium hover:text-gray-900">Register</Link>
                </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
