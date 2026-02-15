import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const EventFeed = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/events');
      setEvents(res.data);
      if (user && localStorage.getItem('role') === 'student') {
          const regRes = await axios.get(`http://localhost:5000/api/events/student/${user._id}`);
          setRegisteredEvents(regRes.data.map(r => r.eventId._id));
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (eventId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = localStorage.getItem('role');

    if (!user || role !== 'student') {
        alert('Please login as a student to register.');
        return; // Alternatively redirect to login
    }

    try {
        const res = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, {
            studentId: user._id
        });
        alert(res.data.message);
        fetchEvents(); // Refresh data
    } catch (err) {
        alert(err.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading events...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Events</h1>
      
      {/* Live Events Section */}
      {events.some(e => e.status === 'LIVE') && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Happening Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.filter(e => e.status === 'LIVE').map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={handleRegister} 
                isRegistered={registeredEvents.includes(event._id || event.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.filter(e => e.status !== 'LIVE').map(event => (
          <EventCard 
            key={event._id} 
            event={event} 
            onRegister={handleRegister} 
            isRegistered={registeredEvents.includes(event._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default EventFeed;
