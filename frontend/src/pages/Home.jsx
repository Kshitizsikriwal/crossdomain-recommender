import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaHeart, FaHeartbeat, FaLungs } from "react-icons/fa";


const Home = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [location, setLocation] = useState({ city: '', country: '' });
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [disease, setDisease] = useState('');
  const navigate = useNavigate();

  // Fetch current date and time
  useEffect(() => {
  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());

    const weekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    setCurrentDay(weekday);
  };

  updateTime(); // run once immediately
  const interval = setInterval(updateTime, 1000); // run every second

  return () => clearInterval(interval); // cleanup on unmount
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
    localStorage.setItem('disease', disease);
    localStorage.setItem('location', `${location.city}, ${location.country}`);
    localStorage.setItem('currentTime', currentTime);

    navigate('/dashboard');
  };

  return (
    <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-violet-300 flex items-center justify-center p-1">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-7xl">
            {/* Welcome Section */}
            <h1 className="text-4xl font-bold text-center mb-2">Welcome, {username}!</h1>
            <p className="text-center text-gray-600 mb-6" >
                Select your health condition to get better recommendations.
            </p>

            {/* Disease Cards */}
            <div className="grid py-6 grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div
                onClick={() => setDisease('diabetes')}
                className={`cursor-pointer border-2 bg-blue-100 rounded-xl px-6 py-14 flex flex-col items-center shadow-md transition hover:scale-105 ${disease === 'diabetes' ? 'border-blue-500' : 'border-gray-200'}`}
                >
                <FaHeart className="text-pink-500 text-4xl mx-auto mb-2" />
                <p className="text-xl font-semibold">Diabetes</p>
                </div>

                <div
                onClick={() => setDisease('cholesterol')}
                className={`cursor-pointer border-2 bg-blue-100 rounded-xl px-6 py-14 flex flex-col items-center shadow-md transition hover:scale-105 ${disease === 'cholesterol' ? 'border-blue-500' : 'border-gray-200'}`}
                >
                <FaHeartbeat className="text-yellow-500 text-4xl mx-auto mb-2" />
                <p className="text-xl font-semibold">Cholesterol</p>
                </div>

                <div
                onClick={() => setDisease('asthma')}
                className={`cursor-pointer border-2 bg-blue-100 rounded-xl px-6 py-14 flex flex-col items-center shadow-md transition hover:scale-105 ${disease === 'asthma' ? 'border-blue-500' : 'border-gray-200'}`}
                >
                <FaLungs className="text-blue-500 text-4xl mx-auto mb-2" />
                <p className="text-xl font-semibold">Asthma</p>
                </div>
            </div>

            {/* Date, Time, Location */}
            <div className="mb-8 text-center text-gray-700">
              <p><strong>Day:</strong> {currentDay}</p>
              <p><strong>Date & Time:</strong> {currentTime}</p>
              <p><strong>Location:</strong> {location.city}, {location.country}</p>
            </div>


            {/* Button */}
            <div className="text-center">
                <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-10 py-5 rounded-lg transition mb-4 shadow-lg"
                >
                Get My Plan
                </button>
            </div>
            </div>
        </div>
    </>

  );
};

export default Home;
