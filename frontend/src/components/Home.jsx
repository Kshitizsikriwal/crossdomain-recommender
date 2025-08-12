import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import { FaHeart, FaHeartbeat, FaLungs } from "react-icons/fa";

const Home = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [location, setLocation] = useState({ city: '', country: '' });
  const [currentTime, setCurrentTime] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [disease, setDisease] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
      setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const pos = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const { latitude, longitude } = pos.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
        setLocation({
          city: data.address.city || data.address.town || 'Unknown',
          country: data.address.country || 'Unknown'
        });
      } catch (err) {
        setLocation({ city: 'Unavailable', country: '' });
      }
      setLoadingLocation(false);
    };
    fetchLocation();
  }, []);

  const handleSubmit = () => {
    if (!disease) {
      alert("Please select a disease");
      return;
    }
    localStorage.setItem('disease', disease);
    localStorage.setItem('location', `${location.city}, ${location.country}`);
    localStorage.setItem('currentTime', currentTime);
    navigate('/dashboard');
  };

  const handleWeeklyPlan = () => {
    if (!disease) {
      alert("Please select a disease");
      return;
    }
    localStorage.setItem('disease', disease);
    localStorage.setItem('location', `${location.city}, ${location.country}`);
    localStorage.setItem('currentTime', currentTime);
    navigate('/weekly-plan');
  };

  const diseases = [
    { id: 'diabetes', label: 'Diabetes', icon: <FaHeart className="text-pink-500 text-4xl" /> },
    { id: 'cholesterol', label: 'Cholesterol', icon: <FaHeartbeat className="text-yellow-500 text-4xl" /> },
    { id: 'asthma', label: 'Asthma', icon: <FaLungs className="text-blue-500 text-4xl" /> }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-200 to-violet-300 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            👋 Welcome, {username}!
          </motion.h1>
          <p className="text-center text-gray-600 mb-6">
            Select your health condition to get better recommendations.
          </p>

          <div className="grid py-6 grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {diseases.map((d) => (
              <motion.div
                key={d.id}
                onClick={() => setDisease(d.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`cursor-pointer border-2 bg-blue-100 rounded-xl px-6 py-14 flex flex-col items-center shadow-md transition ${
                  disease === d.id ? 'border-blue-500 shadow-lg scale-105' : 'border-gray-200'
                }`}
              >
                {d.icon}
                <p className="text-xl font-semibold mt-2">{d.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mb-8 text-center text-gray-700">
            <p><strong>Day:</strong> {currentDay}</p>
            <p><strong>Date & Time:</strong> {currentTime}</p>
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(59,130,246,0.7)" }}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-10 py-5 rounded-lg transition"
            >
              Get My Plan
            </motion.button>
            <motion.button
              onClick={handleWeeklyPlan}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(34,197,94,0.7)" }}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-10 py-5 rounded-lg transition"
            >
              View Weekly Plan
            </motion.button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
