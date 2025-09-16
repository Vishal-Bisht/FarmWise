import { useState } from "react";
import { motion } from "framer-motion";
import {
  SunIcon,
  CloudIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const WeatherWidget = ({ expanded = false }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const currentWeather = {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 7,
    precipitation: 15,
  };

  const forecast = [
    {
      day: "Today",
      high: 30,
      low: 22,
      condition: "Sunny",
      icon: "☀️",
      humidity: 65,
      wind: 12,
    },
    {
      day: "Tomorrow",
      high: 28,
      low: 20,
      condition: "Cloudy",
      icon: "☁️",
      humidity: 70,
      wind: 15,
    },
    {
      day: "Wed",
      high: 25,
      low: 18,
      condition: "Rain",
      icon: "🌧️",
      humidity: 85,
      wind: 18,
    },
    {
      day: "Thu",
      high: 27,
      low: 19,
      condition: "Partly Cloudy",
      icon: "⛅",
      humidity: 60,
      wind: 10,
    },
    {
      day: "Fri",
      high: 29,
      low: 21,
      condition: "Sunny",
      icon: "☀️",
      humidity: 55,
      wind: 8,
    },
    {
      day: "Sat",
      high: 31,
      low: 23,
      condition: "Hot",
      icon: "🌡️",
      humidity: 45,
      wind: 6,
    },
    {
      day: "Sun",
      high: 26,
      low: 19,
      condition: "Windy",
      icon: "💨",
      humidity: 70,
      wind: 22,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  if (expanded) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Weather Forecast
        </h2>

        {/* Detailed forecast grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forecast.map((day, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{day.icon}</div>
                <h3 className="font-semibold text-gray-800">{day.day}</h3>
                <p className="text-sm text-gray-600 mb-2">{day.condition}</p>
                <div className="flex justify-center items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800">
                    {day.high}°
                  </span>
                  <span className="text-sm text-gray-500">{day.low}°</span>
                </div>
                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  <div>Humidity: {day.humidity}%</div>
                  <div>Wind: {day.wind} km/h</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full transform -translate-x-8 translate-y-8"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weather Today</h3>
          <CloudIcon className="w-6 h-6 text-white opacity-80" />
        </div>

        <div className="space-y-4">
          {/* Current temperature */}
          <div className="flex items-center space-x-4">
            <div className="text-4xl">☀️</div>
            <div>
              <div className="text-3xl font-bold">
                {currentWeather.temperature}°C
              </div>
              <div className="text-blue-100">{currentWeather.condition}</div>
            </div>
          </div>

          {/* Weather details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white bg-opacity-30 rounded"></div>
                <span>Humidity</span>
              </div>
              <div className="font-semibold">{currentWeather.humidity}%</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-white bg-opacity-30 rounded"></div>
                <span>Wind</span>
              </div>
              <div className="font-semibold">
                {currentWeather.windSpeed} km/h
              </div>
            </div>
          </div>

          {/* 3-day mini forecast */}
          <div className="pt-4 border-t border-white border-opacity-20">
            <div className="flex justify-between text-sm">
              {forecast.slice(1, 4).map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs opacity-80 mb-1">{day.day}</div>
                  <div className="text-lg mb-1">{day.icon}</div>
                  <div className="font-semibold">{day.high}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherWidget;
