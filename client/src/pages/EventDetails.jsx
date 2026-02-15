import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Clock, MapPin, Users, Calendar } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        // Ideally we'd have a GET /api/events/:id endpoint, but filtering for now
        const found = res.data.find(e => e._id === id || e.id === id);
        if (found) setEvent(found);
        else setError('Event not found');
        setLoading(false);
      } catch (err) {
        setError('Failed to load event');
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');

    if (!user || role !== 'student') {
        alert('Please login as a student to register.');
        navigate('/login');
        return;
    }

    try {
        const res = await axios.post(`http://localhost:5000/api/events/${id}/register`, {
            studentId: user._id
        });
        alert(res.data.message);
        // Refresh event data
        window.location.reload(); 
    } catch (err) {
        alert(err.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error || !event) return <div className="text-center mt-10 text-red-500">{error || 'Event not found'}</div>;

  const { title, description, venue, startTime, endTime, totalSeats, registeredCount, status } = event;
  const isFull = registeredCount >= totalSeats;
  const isLive = status === 'LIVE';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 h-32 flex items-center justify-center">
            <Calendar className="text-white w-16 h-16 opacity-50" />
        </div>
        <div className="p-8">
            <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
                {isLive && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-800 animate-pulse-slow">
                        LIVE NOW
                    </span>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-gray-600">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <div>
                        <p className="font-semibold">Start: {new Date(startTime).toLocaleString()}</p>
                        <p>End: {new Date(endTime).toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <p className="font-semibold">{venue}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-indigo-500" />
                    <p className="font-semibold">{registeredCount} / {totalSeats} Registered</p>
                </div>
            </div>

            <div className="prose max-w-none text-gray-700 mb-8">
                <h3 className="text-xl font-semibold mb-2">About this Event</h3>
                <p>{description}</p>
            </div>

            <div className="border-t pt-6">
                <button
                    onClick={handleRegister}
                    disabled={status === 'ENDED'}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-bold transition ${
                        status === 'ENDED' 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isFull 
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                >
                    {status === 'ENDED' ? 'Event has Ended' : isFull ? 'Join Waitlist' : 'Register for Event'}
                </button>
                {isFull && <p className="text-center text-sm text-orange-600 mt-2">The event is full. You will be placed on the waitlist.</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
