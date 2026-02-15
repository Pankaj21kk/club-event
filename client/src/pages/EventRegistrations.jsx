import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EventRegistrations = () => {
    const { id } = useParams();
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/events/${id}/registrations`);
                setRegistrations(res.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch registrations');
                setLoading(false);
            }
        };
        fetchRegistrations();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Event Registrations</h1>
                <Link to="/profile" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    &larr; Back to Profile
                </Link>
            </div>

            {registrations.length === 0 ? (
                <p className="text-gray-500 bg-white p-6 rounded-lg shadow">No students registered yet.</p>
            ) : (
                <div className="bg-white shadow overflow-hidden rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Roll No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Socials
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Registered At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {registrations.map(reg => (
                                <tr key={reg._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{reg.student?.name || 'Unknown'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{reg.student?.rollNo || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{reg.student?.email || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-3">
                                            {reg.student?.githubProfile && (
                                                <a href={reg.student.githubProfile} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" title="GitHub">
                                                    <i className="ri-github-fill text-lg"></i>
                                                </a>
                                            )}
                                            {reg.student?.linkedinProfile && (
                                                <a href={reg.student.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors" title="LinkedIn">
                                                    <i className="ri-linkedin-box-fill text-lg"></i>
                                                </a>
                                            )}
                                            {reg.student?.xProfile && (
                                                <a href={reg.student.xProfile} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" title="X (Twitter)">
                                                    <i className="ri-twitter-x-fill text-lg"></i>
                                                </a>
                                            )}
                                            {reg.student?.portfolioUrl && (
                                                <a href={reg.student.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-600 transition-colors" title="Portfolio">
                                                    <i className="ri-global-line text-lg"></i>
                                                </a>
                                            )}
                                            {!reg.student?.githubProfile && !reg.student?.linkedinProfile && !reg.student?.xProfile && !reg.student?.portfolioUrl && (
                                                <span className="text-xs text-gray-300">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            reg.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {reg.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(reg.timestamp).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventRegistrations;
