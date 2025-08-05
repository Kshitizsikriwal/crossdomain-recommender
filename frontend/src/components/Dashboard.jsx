import React, { useState, useEffect } from 'react';
import yogaImageMap from "./yogaImageMap";
import Header from './Header';


const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 11) return "breakfast";
  if (hour < 16) return "lunch";
  return "dinner";
};

const getCurrentDay = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' });
};

const getCurrentWeek = () => {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const diff = (new Date() - start) / (1000 * 60 * 60 * 24);
  return Math.ceil((diff + start.getDay() + 1) / 7);
};

const extractYogaPoseNames = (yogaString) => {
  if (!yogaString) return [];

  return yogaString
    .split(';')  // Split by semicolon
    .map(part => {
      // Extract only the pose name, ignoring duration in brackets
      const match = part.match(/^([^()]+?)(\s*\([^)]*\))?$/);
      return match?.[1]?.trim();
    })
    .filter(Boolean);  // Remove empty entries
};



const Dashboard = () => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const disease = localStorage.getItem("disease")?.toLowerCase();
      const time = getTimeOfDay();
      const day = getCurrentDay();
      const week = getCurrentWeek();

      console.log("🌐 Fetching data for:", { disease, time, day, week });

      const file = week % 2 === 1 ? "/instruct_final_recommendations.json" : "/hermes_final_recommendations.json";

      try {
        const res = await fetch(file);
        const json = await res.json();

        console.log("📦 Loaded JSON entries:", json.length);
        console.log("📄 Sample entry:", json[0]);

        const filtered = json.find(
          item =>
            item.disease.toLowerCase() === disease &&
            item.day.toLowerCase() === day.toLowerCase() &&
            item.time.toLowerCase() === time
        );

        console.log("✅ Fetched recommendation data:", filtered);
        setData(filtered || {});
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to load recommendations", error);
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading recommendations...</p>
      </div>
    );
  }


  const current = toggle ? {
    yoga: {
      pose: data?.alternative_yoga || "Unknown Pose",
      exercise: data?.alternative_exercise || "-",
      precaution: data?.alternative_precaution || "-",
    },
    meal: {
      name: data?.meal_meal_name || "-",
      description: data?.meal_meal_description || "-",
      Meal_type: data?.time || "-",
      nutrients: {
        Calories: data?.meal_calories || "-",
        Protein: data?.meal_protein || "-",
        Carbohydrates: data?.meal_carbohydrates || "-",
        Fiber: data?.meal_fiber || "-",
        Fat: data?.meal_fat || "-",
        Sugar: data?.meal_sugar || "-",
        Cholesterol: data?.meal_cholesterol || "-",
        Sodium: data?.meal_sodium || "-"
      }
    }
  } : {
    yoga: {
      pose: data?.yoga || "Unknown Pose",
      exercise: data?.exercise || "-",
      precaution: data?.precaution || "-",
    },
    meal: {
      name: data?.alternative_meal_meal_name || "-",
      description: data?.alternative_meal_meal_description || "-",
      Meal_type: data?.time || "-",
      nutrients: {
        Calories: data?.alternative_meal_calories || "-",
        Protein: data?.alternative_meal_protein || "-",
        Carbohydrates: data?.alternative_meal_carbohydrates || "-",
        Fiber: data?.alternative_meal_fiber || "-",
        Fat: data?.alternative_meal_fat || "-",
        Sugar: data?.alternative_meal_sugar || "-",
        Cholesterol: data?.alternative_meal_cholesterol || "-",
        Sodium: data?.alternative_meal_sodium || "-"
      }
    }

  };


  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center ">
        <h1 className="text-3xl font-bold text-center text-blue-700">HealthWise Dashboard</h1>
        <p className='text-center mb-8 text-gray-500'>Personalized recommendations to help manage your health levels.</p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Yoga / Exercise Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">Yoga & Exercise</h2>

            {/* Render multiple yoga poses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {extractYogaPoseNames(current.yoga.pose).map((pose, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={yogaImageMap[pose.toLowerCase()] || yogaImageMap["default"]}
                    alt={pose}
                    className="w-45 h-45 object-contain rounded-md shadow-md"
                  />
                  <p className="mt-2 text-sm text-center font-medium text-gray-700">{pose}</p>
                </div>
              ))}
            </div>
            <p><span className='font-semibold'>Pose:</span> {current.yoga.pose}</p> 
            <p><span className="font-semibold">Exercise:</span> {current.yoga.exercise}</p>
            <p><span className="font-semibold">Precaution:</span> {current.yoga.precaution}</p>
          </div>


          {/* Meal Plan Card */}
          <div
            className="relative shadow-xl rounded-2xl p-6 w-full md:w-1/2 overflow-hidden bg-white"
            style={{
              backgroundImage: `url('/images/meal-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-25 bg-black rounded-2xl z-0"></div>

            {/* Content */}
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl font-bold text-center text-red-100"> Meal Plan</h2>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  <span className="text-gray-200">Meal:</span> {current.meal.name}
                </h3>
                <p className="text-l italic text-gray-50">{current.meal.description}</p>
                <p className="text-l py-3">
                  <span className="font-semibold text-gray-200">Meal Type:</span>
                  <span className="ml-2 px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs uppercase tracking-wide">
                    {current.meal.Meal_type}
                  </span>
                </p>
              </div>

              {/* Nutrients Card */}
              <div className="bg-white bg-opacity-95 border border-gray-300 rounded-lg p-5 shadow-inner">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Nutrients
                </h4>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(current.meal.nutrients).map(([key, value]) => (
                    <li
                      key={key}
                      className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 rounded px-2 py-1 shadow-sm hover:bg-gray-100 transition"
                    >
                      <span className="font-semibold capitalize">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
          >
            Generate Alternative Plan
          </button>

        </div>
      </div>
    </>
    
  );
};

export default Dashboard;