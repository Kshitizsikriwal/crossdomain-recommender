import React, { useState } from 'react';
import yogaImageMap from "./yogaImageMap";
import Header from './Header';

const Dashboard = () => {
  const [toggle, setToggle] = useState(false);

  const staticData = [
    {
      yoga: {
        pose: "Bhujangasana",
        exercise: "15-min light stretching",
        precaution: "Avoid heavy workouts after meals",
      },
      meal: {
        name: "Oats with Fruits",
        description: "A bowl of oats topped with banana, apple, and chia seeds.",
        Meal_type: "breakfast",
        nutrients: {
          Protein: "5g",
          Carbs: "35g",
          Fats: "4g",
          Fiber: "8g"
        }
      }
    },
    {
      yoga: {
        pose: "Tadasana",
        exercise: "10-min breathing exercises",
        precaution: "Stay hydrated during practice",
      },
      meal: {
        name: "Vegetable Upma",
        description: "Healthy semolina-based dish with peas, carrots, and spices.",
        Meal_type: "breakfast",
        nutrients: {
          Protein: "6g",
          Carbs: "30g",
          Fats: "3g",
          Fiber: "5g"
        }
      }
    }
  ];

  const current = toggle ? staticData[1] : staticData[0];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-blue-700">HealthWise Dashboard</h1>
        <p className='text-center mb-8 text-gray-500'>Personalized recommendations to help manage your health levels.</p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Yoga / Exercise Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">Yoga & Exercise</h2>
              <img
                src={yogaImageMap[current.yoga.pose] || yogaImageMap["default"]}
                alt={current.yoga.pose}
                className="w-64 h-64 object-contain rounded mb-4"
              />
            <p><span className="font-semibold">Yoga Pose:</span> {current.yoga.pose}</p>
            <p><span className="font-semibold">Exercise:</span> {current.yoga.exercise}</p>
            <p><span className="font-semibold">Precaution:</span> {current.yoga.precaution}</p>
          </div>

          {/* Meal Plan Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-red-700 text-center">Meal Plan</h2>
            <p><span className="font-semibold">Meal:</span> {current.meal.name}</p>
            <p><span className="font-semibold">Description:</span> {current.meal.description}</p>
            <p className='mb-4'><span className="font-semibold">Meal Type:</span> {current.meal.Meal_type}</p>

            <div className="bg-gray-100 rounded-md p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Nutrients</h3>
              <ul className="grid grid-cols-2 gap-2">
                {Object.entries(current.meal.nutrients).map(([key, value]) => (
                  <li key={key} className="text-sm text-gray-600">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Generate Alternative Plan
          </button>
        </div>
      </div>
    </>
    
  );
};

export default Dashboard;