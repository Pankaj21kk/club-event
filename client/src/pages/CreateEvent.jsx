import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        startTime: '',
        endTime: '',
        totalSeats: '',
        entryFee: 0,
        imageUrl: '',
        requiredFields: [],
        createdBy: JSON.parse(localStorage.getItem('user'))?._id
    });
    const [isFree, setIsFree] = useState(true);
    const [error, setError] = useState('');

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
            await axios.post('http://localhost:5000/api/events', formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
            
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
                        <option value="Student Activity Centre">Student Activity Centre</option>
                        <option value="IT Building - Lab 1">IT Building </option>
                        <option value="Central Lawn">Central Lawn</option>
                        <option value="Mega Ground">Mega Ground</option>
                        <option value="MBH Ground">MBH Ground</option>
                        <option value="OAT">OAT</option>
                        <option value="CSH">CSH</option>
                        <option value="VCH">VCH</option>
                        <option value="Others">Others</option>
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

                <div>
                    <label className="block text-sm font-medium text-gray-700">Event Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="https://example.com/event-image.jpg"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <p className="mt-1 text-xs text-gray-500">Optional: Enter a URL for the event banner image</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Student Profiles (for Registration)</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['githubProfile', 'linkedinProfile', 'xProfile', 'portfolioUrl'].map((field) => (
                            <label key={field} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox text-indigo-600 rounded"
                                    checked={formData.requiredFields.includes(field)}
                                    onChange={(e) => {
                                        const { checked } = e.target;
                                        setFormData(prev => ({
                                            ...prev,
                                            requiredFields: checked 
                                                ? [...prev.requiredFields, field]
                                                : prev.requiredFields.filter(f => f !== field)
                                        }));
                                    }}
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                    {field.replace('Profile', '').replace('Url', '')}
                                </span>
                            </label>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Students will be prompted to add these to their profile if missing.</p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                    >
                        Create Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;
