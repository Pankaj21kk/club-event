import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({ event, onRegister, isRegistered }) => {
    const { title, description, venue, startTime, totalSeats, registeredCount, status, _id, entryFee } = event;

    // Basic date formatting
    const formattedTime = new Date(startTime).toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const isLive = status === 'LIVE';
    const isFull = registeredCount >= totalSeats;

    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop';
    const displayImage = event.imageUrl || DEFAULT_IMAGE;
    
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition hover:shadow-xl flex flex-col h-full">
            {/* Event Image */}
            <div className="h-48 overflow-hidden bg-neutral-100">
                <img 
                    src={displayImage} 
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('bg-gradient-to-br', 'from-orange-500', 'to-orange-600');
                        e.target.parentElement.classList.remove('bg-neutral-100');
                    }}
                />
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
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
                
                <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{description}</p>
                
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
                    {event.createdBy?.clubName && (
                        <div className="flex items-center gap-2">
                            <i className="ri-team-line w-4 h-4" />
                            <span className="text-xs">By {event.createdBy.clubName}</span>
                        </div>
                    )}
                     <div className="flex items-center gap-2 font-semibold">
                        <span className={`px-2 py-1 rounded text-xs ${!entryFee || entryFee === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {!entryFee || entryFee === 0 ? 'Free Entry' : `₹${entryFee}`}
                        </span>
                    </div>
                </div>

                <div className="mt-auto">
                {isRegistered ? (
                     <div className="block w-full text-center py-2 px-4 rounded-lg font-semibold bg-green-100 text-green-700 border border-green-200 cursor-default">
                         Registered
                     </div>
                ) : (
                    <Link
                    to={`/events/${_id}`}
                    className={`block w-full text-center py-2 px-4 rounded-lg font-semibold transition text-white ${
                        status === 'ENDED' 
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isFull 
                            ? 'bg-orange-500 hover:bg-orange-600'
                            : 'bg-primary hover:opacity-90'
                    }`}
                    >
                    {status === 'ENDED' ? 'Event Ended' : isFull ? 'Join Waitlist' : 'View & Register'}
                    </Link>
                )}
                </div>
            </div>
        </div>
    );
};

export default EventCard;
