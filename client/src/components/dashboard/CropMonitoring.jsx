import { useState } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  BeakerIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CropMonitoring = ({ expanded = false }) => {
  const [selectedCrop, setSelectedCrop] = useState(0);

  const crops = [
    {
      name: "Wheat",
      status: "Healthy",
      progress: 75,
      daysToHarvest: 45,
      yield: "2,400 kg",
      health: 95,
      statusColor: "green",
      icon: "🌾",
      issues: [],
    },
    {
      name: "Tomatoes",
      status: "Needs Attention",
      progress: 60,
      daysToHarvest: 30,
      yield: "800 kg",
      health: 70,
      statusColor: "yellow",
      icon: "🍅",
      issues: ["Low soil moisture", "Pest detected"],
    },
    {
      name: "Corn",
      status: "Excellent",
      progress: 85,
      daysToHarvest: 25,
      yield: "1,200 kg",
      health: 98,
      statusColor: "green",
      icon: "🌽",
      issues: [],
    },
    {
      name: "Rice",
      status: "Growing",
      progress: 40,
      daysToHarvest: 65,
      yield: "1,800 kg",
      health: 88,
      statusColor: "blue",
      icon: "🌾",
      issues: ["Monitoring water levels"],
    },
  ];

  // Chart data for crop growth
  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Growth Progress (%)",
        data: [10, 25, 40, 55, 70, 85],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Health Score",
        data: [80, 85, 88, 92, 95, 98],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Healthy":
      case "Excellent":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case "Needs Attention":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case "Growing":
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <BeakerIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (expanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Crop Monitoring</h2>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((crop, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCrop(index)}
              className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                selectedCrop === index ? "ring-2 ring-green-500" : ""
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{crop.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {crop.name}
                </h3>
                <div
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(
                    crop.statusColor
                  )}`}
                >
                  {getStatusIcon(crop.status)}
                  <span>{crop.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Crop Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {crops[selectedCrop].name} Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Growth Progress</span>
                <span className="font-semibold">
                  {crops[selectedCrop].progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${crops[selectedCrop].progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Days to Harvest</span>
                  <div className="font-semibold">
                    {crops[selectedCrop].daysToHarvest}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Expected Yield</span>
                  <div className="font-semibold">
                    {crops[selectedCrop].yield}
                  </div>
                </div>
              </div>

              {crops[selectedCrop].issues.length > 0 && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">
                    Issues to Address:
                  </h4>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    {crops[selectedCrop].issues.map((issue, idx) => (
                      <li key={idx}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Growth Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Growth Analytics</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Crop Status</h3>
        <ChartBarIcon className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {crops.slice(0, 3).map((crop, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{crop.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{crop.name}</div>
                <div className="text-sm text-gray-600">
                  {crop.progress}% grown
                </div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(
                  crop.statusColor
                )}`}
              >
                {getStatusIcon(crop.status)}
                <span>{crop.status}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {crop.daysToHarvest} days left
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 text-green-600 font-medium text-sm hover:bg-green-50 rounded-lg transition-colors"
      >
        View All Crops →
      </motion.button>
    </motion.div>
  );
};

export default CropMonitoring;
