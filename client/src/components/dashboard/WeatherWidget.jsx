import React from "react";

const WeatherWidget = ({
  temperature = "24°C",
  humidity = "78%",
  airQuality = "Good",
}) => {
  return (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-emerald-600">{temperature}</div>
        <div className="text-xs text-slate-500">Temperature</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{humidity}</div>
        <div className="text-xs text-slate-500">Humidity</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600">{airQuality}</div>
        <div className="text-xs text-slate-500">Air Quality</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
