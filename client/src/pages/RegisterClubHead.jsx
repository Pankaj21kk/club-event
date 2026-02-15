import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clubs = [
    { name: "GDSC NITJ" },
    { name: "Team Daksh" },
    { name: "Robotics Club" },
    { name: "LADC Society" },
    { name: "Fine Arts" },
    { name: "R-Tists" },
]; // Simplified for dropdown, icons/colors not needed in select

const RegisterClubHead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    clubName: '',
    phone: '',
    collegeEmail: '',
    rollNo: '',
    branch: '',
    year: '',
    designation: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register/club-head', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Club Head Registration</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm center">{error}</div>}

            {['name', 'clubName', 'phone', 'collegeEmail', 'rollNo', 'branch', 'year', 'designation'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="mt-1">
                  {field === 'clubName' ? (
                      <select
                        id={field}
                        name={field}
                        required
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={formData[field]}
                        onChange={handleChange}
                      >
                        <option value="">Select a Club</option>
                        {clubs.map(club => (
                            <option key={club.name} value={club.name}>{club.name}</option>
                        ))}
                      </select>
                  ) : (
                      <input
                        id={field}
                        name={field}
                        type={field === 'collegeEmail' ? 'email' : 'text'}
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                        value={formData[field]}
                        onChange={handleChange}
                      />
                  )}
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClubHead;
