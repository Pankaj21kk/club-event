import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        venue: '',
        startTime: '',
        endTime: '',
        totalSeats: '',
        entryFee: 0,
        imageUrl: '',
        requiredFields: []
    });
    const [isFree, setIsFree] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
             try {
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
                        entryFee: event.entryFee || 0,
                        imageUrl: event.imageUrl || '',
                        requiredFields: event.requiredFields || []
                    });
                    setIsFree(!event.entryFee || event.entryFee === 0);
                } else {
                    showNotification('Event not found', 'error');
                    navigate('/profile');
                }
                setLoading(false);
            } catch (err) {
                showNotification('Failed to fetch event details', 'error');
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRequiredFieldsChange = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;
        
        if (checked) {
            setFormData({ ...formData, requiredFields: [...formData.requiredFields, value] });
        } else {
            setFormData({ 
                ...formData, 
                requiredFields: formData.requiredFields.filter(field => field !== value) 
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const start = new Date(formData.startTime);
        const end = new Date(formData.endTime);

        if (start >= end) {
            showNotification('End time must be after start time.', 'error');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/events/${id}`, formData);
            showNotification('Event updated successfully!', 'success');
            navigate('/profile');
        } catch (err) {
            showNotification(err.response?.data?.message || 'Failed to update event', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-black border-t-orange-600 rounded-full animate-spin" />
                    <p className="text-[13px] font-bold uppercase tracking-widest text-neutral-400">Loading event...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/profile')}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black hover:text-orange-600 transition-colors mb-4"
                    >
                        <i className="ri-arrow-left-line" /> Back to Profile
                    </button>
                    <h1 className="text-4xl font-black text-black">Edit Event</h1>
                    <p className="text-neutral-600 mt-2">Update your event details below</p>
                </div>
                
                <form onSubmit={handleSubmit} className="bg-white border-2 border-black rounded-sm p-8 space-y-6 shadow-[8px_8px_0px_#0D0D0D]">
                    
                    {/* Event Title */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Event Title <span className="text-orange-600">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter event title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors resize-none"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your event..."
                        />
                    </div>

                    {/* Venue */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Venue <span className="text-orange-600">*</span>
                        </label>
                        <select
                            name="venue"
                            required
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
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

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">
                                Start Time <span className="text-orange-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="startTime"
                                required
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                                value={formData.startTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">
                                End Time <span className="text-orange-600">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="endTime"
                                required
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                                value={formData.endTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Total Seats */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Total Seats <span className="text-orange-600">*</span>
                        </label>
                        <input
                            type="number"
                            name="totalSeats"
                            required
                            min="1"
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                            value={formData.totalSeats}
                            onChange={handleChange}
                            placeholder="Number of seats"
                        />
                    </div>

                    {/* Entry Fee */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-3">Entry Fee</label>
                        <div className="flex items-center gap-6 mb-3">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    className="w-4 h-4 text-orange-600 border-neutral-300 focus:ring-orange-600"
                                    name="feeType"
                                    checked={isFree}
                                    onChange={() => {
                                        setIsFree(true);
                                        setFormData({ ...formData, entryFee: 0 });
                                    }}
                                />
                                <span className="ml-2 text-sm font-medium text-neutral-700">Free</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    className="w-4 h-4 text-orange-600 border-neutral-300 focus:ring-orange-600"
                                    name="feeType"
                                    checked={!isFree}
                                    onChange={() => setIsFree(false)}
                                />
                                <span className="ml-2 text-sm font-medium text-neutral-700">Paid</span>
                            </label>
                        </div>
                        {!isFree && (
                            <input
                                type="number"
                                name="entryFee"
                                min="1"
                                placeholder="Enter amount in ₹"
                                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                                value={formData.entryFee}
                                onChange={handleChange}
                            />
                        )}
                    </div>

                    {/* Event Image URL */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            Event Image URL
                        </label>
                        <input
                            type="url"
                            name="imageUrl"
                            placeholder="https://example.com/event-image.jpg"
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-sm focus:border-orange-600 focus:outline-none transition-colors"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-neutral-500 mt-1">Optional: Enter a URL for the event banner image</p>
                    </div>

                    {/* Required Fields */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-3">
                            Required Student Information
                        </label>
                        <p className="text-xs text-neutral-500 mb-3">
                            Select which profile fields students must complete before registering
                        </p>
                        <div className="space-y-2">
                            {[
                                { value: 'githubProfile', label: 'GitHub Profile' },
                                { value: 'linkedinProfile', label: 'LinkedIn Profile' },
                                { value: 'xProfile', label: 'X (Twitter) Profile' },
                                { value: 'portfolioUrl', label: 'Portfolio URL' }
                            ].map(field => (
                                <label key={field.value} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={field.value}
                                        checked={formData.requiredFields.includes(field.value)}
                                        onChange={handleRequiredFieldsChange}
                                        className="w-4 h-4 text-orange-600 border-neutral-300 rounded focus:ring-orange-600"
                                    />
                                    <span className="text-sm text-neutral-700">{field.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-6 border-t-2 border-neutral-100">
                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            className="flex-1 px-6 py-3 bg-white border-2 border-black text-black font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-neutral-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-black border-2 border-black text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-orange-600 hover:border-orange-600 transition-colors"
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
