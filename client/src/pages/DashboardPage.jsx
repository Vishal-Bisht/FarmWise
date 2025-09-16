import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsOverview from "../components/dashboard/StatsOverview";
import WeatherWidget from "../components/dashboard/WeatherWidget";
import CropMonitoring from "../components/dashboard/CropMonitoring";
import RecentActivity from "../components/dashboard/RecentActivity";

import FarmAnalytics from "../components/dashboard/FarmAnalytics";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardPage = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  if (!userLoggedIn) {
    return null;
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-6">
              <div className="xl:col-span-3 lg:col-span-2 space-y-6">
                <StatsOverview />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CropMonitoring />
                  <FarmAnalytics />
                </div>
              </div>
              <div className="space-y-6">
                <WeatherWidget />
                <RecentActivity />
              </div>
            </div>
          </div>
        );

      case "crop-recommendation":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    AI Crop Recommendations
                  </h1>
                  <p className="text-slate-600 mt-2">
                    Personalized suggestions based on your soil, weather, and
                    market data
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Recommended Crops */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🌽</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Sweet Corn
                      </h3>
                      <p className="text-sm text-green-600">95% Match</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Perfect for your soil pH and current season. High market
                    demand expected.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expected Yield:</span>
                      <span className="font-medium">180 bu/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ROI:</span>
                      <span className="font-medium text-green-600">+34%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🌾</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Winter Wheat
                      </h3>
                      <p className="text-sm text-blue-600">88% Match</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Good rotation crop. Suitable for your climate zone and soil
                    conditions.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expected Yield:</span>
                      <span className="font-medium">65 bu/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ROI:</span>
                      <span className="font-medium text-blue-600">+28%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🥕</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Carrots</h3>
                      <p className="text-sm text-amber-600">82% Match</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">
                    Premium market opportunity. Your sandy loam soil is ideal.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Expected Yield:</span>
                      <span className="font-medium">28 tons/acre</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ROI:</span>
                      <span className="font-medium text-amber-600">+42%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "weather-forecast":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Weather Forecast & Analysis
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WeatherWidget expanded={true} />

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">
                    Agricultural Alerts
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                      <h4 className="font-medium text-yellow-800">
                        Frost Warning
                      </h4>
                      <p className="text-yellow-700 text-sm mt-1">
                        Temperatures may drop to 2°C tonight. Consider crop
                        protection.
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-lg">
                      <h4 className="font-medium text-blue-800">
                        Rain Opportunity
                      </h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Heavy rain expected this weekend - perfect for seeding
                        delay.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "soil-analysis":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Soil Health Analysis
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">
                    Soil Composition Map
                  </h3>
                  <div className="h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🗺️</div>
                      <p className="text-slate-600">
                        Interactive soil analysis map
                      </p>
                      <p className="text-slate-500 text-sm">
                        Real-time pH, moisture, and nutrient levels
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold mb-4">Key Metrics</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">
                            pH Level
                          </span>
                          <span className="text-sm font-medium">6.8</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "68%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">
                            Moisture
                          </span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-slate-600">
                            Nutrients
                          </span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="font-semibold mb-4">Recommendations</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Add lime to increase pH in Field A</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Improve drainage in Field C</span>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                        <span>Apply nitrogen fertilizer in 2 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "pest-alert":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Pest Alert System
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-red-800">
                        High Risk Alert
                      </h3>
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Urgent
                      </span>
                    </div>
                    <p className="text-red-700 mb-4">
                      Aphids detected in Field B. Immediate action required to
                      prevent spread.
                    </p>
                    <div className="flex space-x-3">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                        View Details
                      </button>
                      <button className="border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">
                        Schedule Treatment
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-yellow-800">
                        Medium Risk
                      </h3>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Monitor
                      </span>
                    </div>
                    <p className="text-yellow-700 mb-4">
                      Cutworm activity increasing in Field A. Monitor closely
                      over next week.
                    </p>
                    <div className="flex space-x-3">
                      <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
                        View Details
                      </button>
                      <button className="border border-yellow-300 text-yellow-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50">
                        Set Reminder
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">
                    Prevention Schedule
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">
                          Preventive Spray - Field C
                        </p>
                        <p className="text-sm text-green-600">
                          Tomorrow, 6:00 AM
                        </p>
                      </div>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">
                          Trap Inspection
                        </p>
                        <p className="text-sm text-blue-600">Friday, 8:00 AM</p>
                      </div>
                      <span className="text-blue-600">⏰</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="font-medium text-purple-800">
                          Beneficial Release
                        </p>
                        <p className="text-sm text-purple-600">Next Monday</p>
                      </div>
                      <span className="text-purple-600">📅</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "ai-assistant":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    AI Farm Assistant
                  </h1>
                  <p className="text-slate-600 mt-2">
                    Your intelligent farming companion powered by advanced AI
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9Z" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                  <div className="h-96 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-10 h-10 text-purple-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        AI Chat Interface
                      </h3>
                      <p className="text-slate-600 mb-4">
                        Ask me anything about your farm operations
                      </p>
                      <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
                        Start Conversation
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Quick Insights</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-green-800 font-medium">💡 Tip</p>
                        <p className="text-green-700">
                          Field rotation will increase yield by 15%
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 font-medium">
                          📊 Prediction
                        </p>
                        <p className="text-blue-700">
                          Optimal harvest date: Oct 15-20
                        </p>
                      </div>
                      <div className="p-3 bg-amber-50 rounded-lg">
                        <p className="text-amber-800 font-medium">⚠️ Alert</p>
                        <p className="text-amber-700">
                          Market prices trending up 8%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">AI Capabilities</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Crop disease identification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Yield prediction</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Market analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        <span>Weather optimization</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
              Settings & Preferences
            </h1>
            <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <p className="text-slate-600">Settings panel coming soon</p>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">
              User Profile
            </h1>
            <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">👤</div>
                <p className="text-slate-600">Profile management coming soon</p>
              </div>
            </div>
          </div>
        );

      default:
        return renderActiveSection();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Agricultural Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-72" : "ml-0 lg:ml-72"
        }`}
      >
        <DashboardHeader
          user={currentUser}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Main Content Area with Professional Layout */}
        <main className="relative z-10">
          {/* Top Stats Bar */}
          <div className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  Farm Overview
                </h1>
                <p className="text-slate-600 mt-1">
                  Welcome back, {currentUser?.displayName || "Farmer"}
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    24°C
                  </div>
                  <div className="text-xs text-slate-500">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">78%</div>
                  <div className="text-xs text-slate-500">Humidity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">Good</div>
                  <div className="text-xs text-slate-500">Soil Health</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Content Grid */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <NotificationPanel />
    </div>
  );
};

export default DashboardPage;
