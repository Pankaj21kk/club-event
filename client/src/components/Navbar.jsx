import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, PlusCircle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = localStorage.getItem('role');
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
              <Calendar className="h-8 w-8" />
              <span>CampusPulse</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
                <>
                    <span className="text-gray-700">Hello, {user.name}</span>
                    <Link to="/profile" className="text-gray-600 hover:text-primary font-medium">Profile</Link>
                    {role === 'club-head' && (
                        <Link 
                        to="/create" 
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition"
                        >
                        <PlusCircle className="h-5 w-5" />
                        <span>Create Event</span>
                        </Link>
                    )}
                    <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 font-medium">Logout</button>
                </>
            ) : (
                <div className="flex gap-4 items-center">
                    <Link to="/login" className="text-primary font-medium hover:text-opacity-80">Login</Link>
                    <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 font-medium">Register</Link>
                </div>
            )}
          </div>
          
           {/* Mobile menu button */}
           <div className="md:hidden flex items-center gap-4">
               <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                   {isOpen ? <X /> : <Menu />}
               </button>
           </div>
        </div>
      </div>
       {/* Mobile Menu */}
       {isOpen && (
        <div className="md:hidden bg-white dark:bg-secondary border-t dark:border-gray-700 px-4 pt-2 pb-4 space-y-2 shadow-lg">
             {user ? (
                <>
                    <div className="block py-2 text-gray-700 dark:text-gray-300 font-bold">Hello, {user.name}</div>
                    <Link to="/profile" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-primary">Profile</Link>
                    {role === 'club-head' && (
                         <Link to="/create" className="block py-2 text-primary font-medium">Create Event</Link>
                    )}
                     <button onClick={handleLogout} className="block w-full text-left py-2 text-gray-500 dark:text-gray-400">Logout</button>
                </>
             ) : (
                 <>
                    <Link to="/login" className="block py-2 text-primary font-medium">Login</Link>
                    <Link to="/register" className="block py-2 text-primary font-medium">Register</Link>
                 </>
             )}
        </div>
       )}
    </nav>
  );
};

export default Navbar;
