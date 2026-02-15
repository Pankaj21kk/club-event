import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({ event, onRegister }) => {
    const { title, description, venue, startTime, totalSeats, registeredCount, status, _id } = event;

    // Basic date formatting
    const formattedTime = new Date(startTime).toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const isLive = status === 'LIVE';
    const isFull = registeredCount >= totalSeats;

    return (
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden border ${isLive ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'} transition hover:shadow-xl`}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        {isLive && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold leading-4 bg-red-100 text-red-800 mb-2 animate-pulse-slow">
                                <span className="w-2 h-2 mr-1 bg-red-600 rounded-full animate-ping"></span>
                                LIVE NOW
                            </span>
                        )}
                        {!isLive && status === 'UPCOMING' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-2">
                                UPCOMING
                            </span>
                        )}
                        {!isLive && status === 'ENDED' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                                ENDED
                            </span>
                        )}
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

                <div className="space-y-2 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{formattedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{registeredCount} / {totalSeats} (Waitlist Avail)</span>
                    </div>
                </div>

                <button
                    onClick={() => onRegister(_id)}
                    disabled={status === 'ENDED'}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition ${status === 'ENDED'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : isFull
                                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {status === 'ENDED' ? 'Event Ended' : isFull ? 'Join Waitlist' : 'Register Now'}
                </button>
            </div>
        </div>
    );
};

export default EventCard;
