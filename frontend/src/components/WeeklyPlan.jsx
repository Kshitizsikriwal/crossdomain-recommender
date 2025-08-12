// src/WeeklyPlan.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header";

const getCurrentWeek = () => {
  const start = new Date(new Date().getFullYear(), 0, 1);
  const diff = (new Date() - start) / (1000 * 60 * 60 * 24);
  return Math.ceil((diff + start.getDay() + 1) / 7);
};

export default function WeeklyPlan() {
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      const disease = localStorage.getItem("disease")?.toLowerCase();
      const week = getCurrentWeek();
      const file =
        week % 2 === 1
          ? "/instruct_final_recommendations.json"
          : "/hermes_final_recommendations.json";

      try {
        const res = await fetch(file);
        const json = await res.json();

        // Filter by disease
        const filtered = json.filter(
          (item) => item.disease.toLowerCase() === disease
        );

        setWeeklyData(filtered);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to load weekly data", error);
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading weekly plan...</p>
      </div>
    );
  }

  // Group data by day
  const groupedByDay = weeklyData.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Weekly Plan
        </h1>

        <div className="space-y-6">
          {Object.keys(groupedByDay).map((day) => (
            <div
              key={day}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-4">
                {day}
              </h2>
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-3 py-2">Time</th>
                    <th className="border border-gray-300 px-3 py-2">Meal</th>
                    <th className="border border-gray-300 px-3 py-2">Yoga / Exercise</th>
                    <th className="border border-gray-300 px-3 py-2">Precaution</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedByDay[day].map((plan, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 capitalize">
                        {plan.time}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {plan.meal_meal_name || "-"}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {plan.yoga} | {plan.exercise}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        {plan.precaution}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
