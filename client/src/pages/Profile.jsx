import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, MapPin } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedRole = localStorage.getItem('role');
    if (storedUser) {
      setUser(storedUser);
      setRole(storedRole);
      
      if (storedRole === 'student') {
        fetchRegistrations(storedUser._id);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchRegistrations = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/events/student/${studentId}`);
      setRegistrations(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDeregister = async (eventId) => {
    if(!window.confirm("Are you sure you want to deregister?")) return;
    try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}/register`, {
            data: { studentId: user._id }
        });
        // Remove from list
        setRegistrations(registrations.filter(r => r.eventId._id !== eventId));
        alert("Deregistered successfully");
    } catch (err) {
        alert(err.response?.data?.message || "Failed to deregister");
    }
  };

  if (!user) return <div className="text-center mt-10">Please login to view profile.</div>;
  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

 return (
  <div className="max-w-5xl mx-auto px-6 py-12">

    {/* Profile Card */}
    <div className="bg-white border border-gray-200 rounded-xl p-8 mb-12">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium text-lg">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-lg">
            {role === 'student' ? user.email : user.collegeEmail}
          </p>
        </div>

        {role === 'student' && (
          <>
            <div>
              <p className="text-sm text-gray-500">Roll No</p>
              <p className="font-medium">{user.rollNo}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Branch / Year</p>
              <p className="font-medium">
                {user.branch} - {user.year}
              </p>
            </div>
          </>
        )}

        {role === 'club-head' && (
          <>
            <div>
              <p className="text-sm text-gray-500">Club Name</p>
              <p className="font-medium">{user.clubName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">{user.designation}</p>
            </div>
          </>
        )}
      </div>
    </div>

    {role === 'student' && (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-8">
      Your Event History
    </h2>

    {registrations.length === 0 ? (
      <p className="text-gray-500">
        No registered events found.
      </p>
    ) : (
      <div className="space-y-6">
        {registrations.map(reg => {
          const event = reg.eventId;
          if (!event) return null;

          const isPast = new Date(event.endTime) < new Date();

          return (
            <div
              key={reg._id}
              className="bg-white border border-gray-200 rounded-lg p-6 flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {event.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {event.venue}
                </p>

                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(event.startTime).toLocaleDateString()}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      reg.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}
                  >
                    {reg.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                {isPast ? (
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Past
                  </span>
                ) : (
                  <>
                    <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      Upcoming
                    </span>

                    <button
                      onClick={() => handleDeregister(event._id)}
                      className="text-xs text-red-500 hover:text-red-700 transition"
                    >
                      Deregister
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}


      {role === 'club-head' && (
         <MyEvents clubHeadId={user._id} />
      )}
    </div>
  );
};


const MyEvents = ({ clubHeadId }) => {
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
        const fetchMyEvents = async () => {
             try {
                const res = await axios.get(`http://localhost:5000/api/events/club-head/${clubHeadId}`);
                setEvents(res.data);
             } catch (err) {
                 console.error("Failed to fetch my events", err);
             }
        };
        fetchMyEvents();
    }, [clubHeadId]);

    const handleDelete = async (eventId) => {
        if(window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`http://localhost:5000/api/events/${eventId}`);
                setEvents(events.filter(e => e._id !== eventId));
            } catch (err) {
                alert("Failed to delete event");
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Created Events</h2>
            {events.length === 0 ? (
                 <p className="text-gray-500">You haven't created any events yet.</p>
            ) : (
                <div className="grid gap-6">
                    {events.map(event => (
                        <div key={event._id} className="bg-white shadow rounded-lg p-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p className="text-gray-600 mb-2">{event.venue} | {new Date(event.startTime).toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Registered: {event.registeredCount} / {event.totalSeats}</p>
                            </div>
                            <div className="flex gap-3">
                                <a href={`/events/${event._id}/registrations`} className="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium">
                                    View Requests
                                </a>
                                <a href={`/events/edit/${event._id}`} className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 font-medium">
                                    Edit
                                </a>
                                <button onClick={() => handleDelete(event._id)} className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
