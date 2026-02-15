import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        startTime: '',
        endTime: '',
        totalSeats: '',
        entryFee: 0
    });
    const [isFree, setIsFree] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
             try {
                // Fetch all events and filter for now since we don't have GET /events/:id specifically implemented
                // Actually, we can implement GET /events/:id or just filter from GET /events
                const res = await axios.get('http://localhost:5000/api/events');
                const event = res.data.find(e => e._id === id || e.id === id);
                if (event) {
                    // Format dates for datetime-local input
                    const start = new Date(event.startTime).toISOString().slice(0, 16);
                    const end = new Date(event.endTime).toISOString().slice(0, 16);
                    setFormData({
                        title: event.title,
                        description: event.description || '',
                        venue: event.venue,
                        startTime: start,
                        endTime: end,
                        totalSeats: event.totalSeats,
                        entryFee: event.entryFee || 0
                    });
                    setIsFree(!event.entryFee || event.entryFee === 0);
                } else {
                    setError('Event not found');
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch event details');
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const start = new Date(formData.startTime);
        const end = new Date(formData.endTime);

        if (start >= end) {
            setError('End time must be after start time.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, formData);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update event');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Event</h1>
            
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                {error && <div className="text-red-500 text-sm">{error}</div>}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Venue</label>
                    <select
                        name="venue"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        value={formData.venue}
                        onChange={handleChange}
                    >
                        <option value="">Select Venue</option>
                        <option value="Main Auditorium">Main Auditorium</option>
                        <option value="IT Building - Lab 1">IT Building - Lab 1</option>
                        <option value="LHC">LHC</option>
                        <option value="Student Activity Centre">Student Activity Centre</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            value={formData.startTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            value={formData.endTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Total Seats</label>
                    <input
                        type="number"
                        name="totalSeats"
                        required
                        min="1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        value={formData.totalSeats}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entry Fee</label>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-primary"
                                name="feeType"
                                checked={isFree}
                                onChange={() => {
                                    setIsFree(true);
                                    setFormData({ ...formData, entryFee: 0 });
                                }}
                            />
                            <span className="ml-2">Free</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-primary"
                                name="feeType"
                                checked={!isFree}
                                onChange={() => setIsFree(false)}
                            />
                            <span className="ml-2">Paid</span>
                        </label>
                    </div>
                    {!isFree && (
                        <input
                            type="number"
                            name="entryFee"
                            min="1"
                            placeholder="Enter Amount"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            value={formData.entryFee}
                            onChange={handleChange}
                        />
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                         className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
