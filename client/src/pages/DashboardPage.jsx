import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Dashboard Components
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardStats from "../components/dashboard/DashboardStats";
import FarmersTable from "../components/dashboard/FarmersTable";
import FarmerDetailsView from "../components/dashboard/FarmerDetailsView";
import WeatherWidget from "../components/dashboard/WeatherWidget";
import Analytics from "../components/dashboard/Analytics";
import QueryManagement from "../components/dashboard/QueryManagement";
import Notifications from "../components/dashboard/Notifications";
import Settings from "../components/dashboard/Settings";

// Data
import { mockFarmers } from "../data/mockData";

const DashboardPage = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'details'

  // Handle notification click
  const handleNotificationClick = () => {
    setActiveSection("notifications");
  };

  const handleViewFarmer = useCallback((farmer) => {
    setSelectedFarmer(farmer);
    setViewMode("details");
  }, []);

  const handleBackToList = useCallback(() => {
    setViewMode("list");
    setSelectedFarmer(null);
  }, []);

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

  const renderMainContent = () => {
    // Show farmer details view if a farmer is selected
    if (viewMode === "details" && selectedFarmer) {
      return (
        <FarmerDetailsView farmer={selectedFarmer} onBack={handleBackToList} />
      );
    }

    // Show dashboard overview with stats and farmers table for main dashboard
    if (activeSection === "dashboard" || activeSection === "farmers") {
      return (
        <div className="space-y-6">
          <DashboardStats />
          <FarmersTable farmers={mockFarmers} onViewFarmer={handleViewFarmer} />
        </div>
      );
    }

    return null;
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "farmers":
      case "dashboard":
        return renderMainContent();

      case "analytics":
        return <Analytics />;

      case "queries":
        return <QueryManagement />;

      case "notifications":
        return <Notifications />;

      case "settings":
        return <Settings currentUser={currentUser} />;

      default:
        return renderMainContent();
    }
  };

  if (!userLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Agricultural Background Pattern */}
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
          onNotificationClick={handleNotificationClick}
        />

        {/* Main Content Area Layout */}
        <main className="relative z-10">
          {/* Top Bar */}
          <div className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-600 mt-1">
                  Welcome back, {currentUser?.displayName || "User"}
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
                  <div className="text-xs text-slate-500">Air Quality</div>
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
    </div>
  );
};

export default DashboardPage;
