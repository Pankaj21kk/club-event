import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EventFeed from './pages/EventFeed';
import RegisterStudent from './pages/RegisterStudent';
import RegisterClubHead from './pages/RegisterClubHead';
import Login from './pages/Login';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import Profile from './pages/Profile';
import EditEvent from './pages/EditEvent';
import EventRegistrations from './pages/EventRegistrations';
import RegisterLanding from './pages/RegisterLanding';
import ClubsPage from './pages/Clubspage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<EventFeed />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterLanding />} />
          <Route path="/register/student" element={<RegisterStudent />} />
          <Route path="/register/club-head" element={<RegisterClubHead />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events/edit/:id" element={<EditEvent />} />
          <Route path="/events/:id/registrations" element={<EventRegistrations />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
