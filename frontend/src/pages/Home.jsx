import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [location, setLocation] = useState({ city: '', country: '' });
  const [currentTime, setCurrentTime] = useState('');
  const [disease, setDisease] = useState('');
  const navigate = useNavigate();

  // Fetch current date and time
  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  }, []);

  // Fetch user location using browser's geolocation API
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = pos.coords;

        // Reverse geocoding using OpenStreetMap (no API key needed)
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        setLocation({
          city: data.address.city || data.address.town || 'Unknown',
          country: data.address.country || 'Unknown'
        });
      } catch (err) {
        console.error('Location fetch error:', err);
        setLocation({ city: 'Unavailable', country: '' });
      }
    };

    fetchLocation();
  }, []);

  const handleSubmit = () => {
    if (!disease) {
      alert("Please select a disease");
      return;
    }

    // Save to localStorage or state manager (temp: localStorage)
    localStorage.setItem('selectedDisease', disease);
    localStorage.setItem('location', `${location.city}, ${location.country}`);
    localStorage.setItem('currentTime', currentTime);

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">🌿 Personal Health Planner</h1>

        <div className="mb-4 text-center text-gray-700">
          <p><strong>Date & Time:</strong> {currentTime}</p>
          <p><strong>Location:</strong> {location.city}, {location.country}</p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">Select a Condition:</label>
          <select
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">-- Choose Disease --</option>
            <option value="diabetes">Diabetes</option>
            <option value="cholestrol">Cholestrol</option>
            <option value="asthma">Asthma</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          Get My Plan
        </button>
      </div>
    </div>
  );
};

export default Home;
