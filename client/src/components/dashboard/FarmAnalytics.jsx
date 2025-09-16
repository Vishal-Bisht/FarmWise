import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FarmAnalytics = ({ expanded = false }) => {
  const [activeTab, setActiveTab] = useState("yield");

  const tabs = [
    { id: "yield", label: "Yield Analysis" },
    { id: "revenue", label: "Revenue" },
    { id: "resources", label: "Resources" },
    { id: "efficiency", label: "Efficiency" },
  ];

  // Yield data
  const yieldData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Wheat (kg)",
        data: [1200, 1400, 1100, 1600, 1800, 2000],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
      },
      {
        label: "Corn (kg)",
        data: [800, 900, 750, 1000, 1100, 1200],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 2,
      },
      {
        label: "Rice (kg)",
        data: [1500, 1300, 1400, 1700, 1600, 1800],
        backgroundColor: "rgba(168, 85, 247, 0.8)",
        borderColor: "rgb(168, 85, 247)",
        borderWidth: 2,
      },
    ],
  };

  // Revenue data
  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [45000, 52000, 48000, 65000, 71000, 78000],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Profit (₹)",
        data: [25000, 28000, 26000, 35000, 41000, 45000],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Resource allocation
  const resourceData = {
    labels: ["Seeds", "Fertilizers", "Water", "Labor", "Equipment", "Other"],
    datasets: [
      {
        data: [25, 20, 15, 25, 10, 5],
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#8B5CF6",
          "#F59E0B",
          "#EF4444",
          "#6B7280",
        ],
        borderWidth: 0,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const renderChart = () => {
    switch (activeTab) {
      case "yield":
        return <Bar data={yieldData} options={chartOptions} />;
      case "revenue":
        return <Line data={revenueData} options={chartOptions} />;
      case "resources":
        return <Doughnut data={resourceData} options={doughnutOptions} />;
      case "efficiency":
        return <Line data={revenueData} options={chartOptions} />;
      default:
        return <Bar data={yieldData} options={chartOptions} />;
    }
  };

  const getInsights = () => {
    switch (activeTab) {
      case "yield":
        return [
          "Wheat production increased by 25% this quarter",
          "Corn yield is consistent with seasonal patterns",
          "Rice production shows strong growth potential",
        ];
      case "revenue":
        return [
          "Revenue growth of 73% compared to last year",
          "Profit margins improved by 12% this month",
          "Best performing month: June with ₹78,000",
        ];
      case "resources":
        return [
          "Seeds and Labor account for 50% of total costs",
          "Water usage is optimized at 15% allocation",
          "Equipment costs could be reduced by 3%",
        ];
      default:
        return [
          "Overall farm efficiency has improved by 15%",
          "Resource utilization is above industry average",
          "Automation opportunities identified",
        ];
    }
  };

  if (expanded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Farm Analytics</h2>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart */}
            <div className="lg:col-span-2">
              <div className="h-80">{renderChart()}</div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Key Insights</h4>
              <div className="space-y-3">
                {getInsights().map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </motion.div>
                ))}
              </div>
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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Farm Analytics</h3>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      <div className="h-48 mb-4">
        <Bar data={yieldData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-lg font-bold text-green-600">+25%</div>
          <div className="text-xs text-gray-600">Yield Growth</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-lg font-bold text-blue-600">₹78K</div>
          <div className="text-xs text-gray-600">Monthly Revenue</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-lg font-bold text-purple-600">89%</div>
          <div className="text-xs text-gray-600">Efficiency</div>
        </div>
      </div>
    </motion.div>
  );
};

export default FarmAnalytics;
