import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  HomeIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "../components/dashboard/Sidebar";

// Mock farmer data - moved outside component to prevent recreation on re-renders
const mockFarmers = [
  {
    id: 1,
    name: "Raj Kumar",
    location: "Punjab, India",
    phone: "+91 98765 43210",
    farmSize: "15 acres",
    crops: "Wheat, Rice",
    soilType: "Loamy",
    query:
      "Yellow leaves appearing on wheat crop, need immediate help with diagnosis and treatment options",
    queryTime: "2 hours ago",
    status: "New Query",
    priority: "High",
    totalQueries: 12,
    pendingQueries: 2,
    satisfaction: "94%",
    attachments: true,
  },
  {
    id: 2,
    name: "Arjun Singh",
    location: "Haryana, India",
    phone: "+91 87654 32109",
    farmSize: "8 acres",
    crops: "Corn, Mustard",
    soilType: "Clay",
    query:
      "Pest infestation in corn field, tried local pesticide but no improvement seen",
    queryTime: "1 day ago",
    status: "In Progress",
    priority: "High",
    totalQueries: 8,
    pendingQueries: 1,
    satisfaction: "89%",
    attachments: true,
  },
  {
    id: 3,
    name: "Mukesh Patel",
    location: "Gujarat, India",
    phone: "+91 76543 21098",
    farmSize: "25 acres",
    crops: "Cotton, Groundnut",
    soilType: "Sandy",
    query:
      "Need guidance on organic fertilizer usage for cotton crop this season",
    queryTime: "3 days ago",
    status: "Resolved",
    priority: "Medium",
    totalQueries: 15,
    pendingQueries: 0,
    satisfaction: "96%",
    attachments: false,
  },
];

const DashboardPage = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'details'
  const [activeTab, setActiveTab] = useState("overview");
  const [advice, setAdvice] = useState("");

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
    setActiveTab("overview");
    setAdvice("");
  }, []);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  }, [userLoggedIn, navigate]);

  // Reset tab when viewing a new farmer
  useEffect(() => {
    if (viewMode === "details" && selectedFarmer) {
      setActiveTab("overview");
      setAdvice("");
    }
  }, [selectedFarmer?.id, viewMode]);

  if (!userLoggedIn) {
    return null;
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const renderFarmerDetails = () => {
    const handleSendAdvice = () => {
      if (!advice.trim()) return;
      alert("Advice sent successfully!");
      setAdvice("");
    };

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Back Button and Header */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBackToList}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Farmers List
            </button>
          </div>

          {/* Farmer Header */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {selectedFarmer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedFarmer.name}
              </h2>
              <div className="flex items-center text-gray-500 mt-1">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{selectedFarmer.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="border-b border-gray-200">
            <nav className="px-6 pt-6 -mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview" },
                { id: "farm", label: "Farm Details" },
                { id: "query", label: "Current Query" },
                { id: "history", label: "History" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {selectedFarmer.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <HomeIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {selectedFarmer.farmSize}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Farm Statistics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Query Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedFarmer.totalQueries}
                      </div>
                      <div className="text-sm text-blue-600">Total Queries</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedFarmer.pendingQueries}
                      </div>
                      <div className="text-sm text-orange-600">Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "query" && (
              <div className="space-y-6">
                {/* Current Query */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Current Query
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800">{selectedFarmer.query}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        Submitted {selectedFarmer.queryTime}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedFarmer.status === "New Query"
                            ? "bg-red-100 text-red-800"
                            : selectedFarmer.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {selectedFarmer.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Send Advice */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Send Expert Advice
                  </h3>
                  <textarea
                    value={advice}
                    onChange={(e) => setAdvice(e.target.value)}
                    placeholder="Type your expert advice here..."
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleSendAdvice}
                      disabled={!advice.trim()}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      Send Advice
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "farmers":
      case "dashboard":
        if (viewMode === "details" && selectedFarmer) {
          return renderFarmerDetails();
        }
        return (
          <div className="space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      New Queries
                    </p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      In Progress
                    </p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Resolved
                    </p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total Farmers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farmers List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Farmer Queries Dashboard
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage and respond to farmer queries efficiently
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Status</option>
                      <option>New Query</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                      <option>All Priority</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farmer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Farm Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Query
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockFarmers.map((farmer) => {
                      const getStatusColor = (status) => {
                        switch (status) {
                          case "New Query":
                            return "bg-red-100 text-red-800";
                          case "In Progress":
                            return "bg-yellow-100 text-yellow-800";
                          case "Resolved":
                            return "bg-green-100 text-green-800";
                          default:
                            return "bg-gray-100 text-gray-800";
                        }
                      };

                      const getPriorityColor = (priority) => {
                        switch (priority) {
                          case "High":
                            return "bg-orange-100 text-orange-800";
                          case "Medium":
                            return "bg-blue-100 text-blue-800";
                          case "Low":
                            return "bg-gray-100 text-gray-800";
                          default:
                            return "bg-gray-100 text-gray-800";
                        }
                      };

                      return (
                        <tr
                          key={farmer.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleViewFarmer(farmer)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {farmer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")
                                      .toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {farmer.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {farmer.location}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {farmer.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              Size: {farmer.farmSize}
                            </div>
                            <div className="text-sm text-gray-500">
                              Crops: {farmer.crops}
                            </div>
                            <div className="text-sm text-gray-500">
                              Soil: {farmer.soilType}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {farmer.query}
                            </div>
                            <div className="text-sm text-gray-500">
                              {farmer.queryTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                farmer.status
                              )}`}
                            >
                              {farmer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                                farmer.priority
                              )}`}
                            >
                              {farmer.priority}
                            </span>
                          </td>
                          <td
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => handleViewFarmer(farmer)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              {farmer.status === "Resolved"
                                ? "Closed"
                                : "Respond"}
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              {farmer.status === "Resolved"
                                ? "Archive"
                                : "Assign"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Analytics & Reports
              </h1>
              <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-slate-600">
                    Advanced analytics dashboard coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "queries":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Query Management
              </h1>

              {/* Time Period Selector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                    <option>Past Week</option>
                    <option>Past Month</option>
                    <option>Past 3 Months</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                    <option>All Status</option>
                    <option>Resolved</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                  </select>
                </div>
                <div className="text-sm text-gray-600">
                  Total: 28 queries resolved this week
                </div>
              </div>

              {/* Queries List */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Query Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Farmer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expert
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resolution Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          id: 1,
                          query:
                            "Pest infestation in wheat crop - brown spots on leaves",
                          farmer: "Raj Kumar",
                          expert: "Dr. Priya Sharma",
                          submittedDate: "Sep 10, 2025",
                          resolvedDate: "Sep 12, 2025",
                          resolutionTime: "2 days",
                          status: "Resolved",
                          satisfaction: "Excellent",
                        },
                        {
                          id: 2,
                          query:
                            "Soil pH testing and fertilizer recommendations",
                          farmer: "Mukesh Patel",
                          expert: "Dr. Amit Singh",
                          submittedDate: "Sep 8, 2025",
                          resolvedDate: "Sep 9, 2025",
                          resolutionTime: "1 day",
                          status: "Resolved",
                          satisfaction: "Good",
                        },
                        {
                          id: 3,
                          query:
                            "Irrigation system optimization for cotton crop",
                          farmer: "Arjun Singh",
                          expert: "Dr. Priya Sharma",
                          submittedDate: "Sep 5, 2025",
                          resolvedDate: "Sep 7, 2025",
                          resolutionTime: "2 days",
                          status: "Resolved",
                          satisfaction: "Excellent",
                        },
                        {
                          id: 4,
                          query: "Organic farming transition guidance needed",
                          farmer: "Sunita Devi",
                          expert: "Dr. Raj Kumar",
                          submittedDate: "Sep 3, 2025",
                          resolvedDate: "Sep 6, 2025",
                          resolutionTime: "3 days",
                          status: "Resolved",
                          satisfaction: "Good",
                        },
                      ].map((query) => (
                        <tr key={query.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 max-w-xs">
                              {query.query}
                            </div>
                            <div className="text-sm text-gray-500">
                              Submitted: {query.submittedDate}
                            </div>
                            <div className="text-sm text-gray-500">
                              Resolved: {query.resolvedDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {query.farmer}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {query.expert}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {query.resolutionTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {query.status}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              Rating: {query.satisfaction}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View Details
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              Export
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Query Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">28</div>
                    <div className="text-sm text-gray-500">
                      Resolved This Week
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1.8</div>
                    <div className="text-sm text-gray-500">
                      Avg Resolution Days
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">94%</div>
                    <div className="text-sm text-gray-500">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-500">Active Experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Expert Notifications
              </h1>

              <div className="space-y-4">
                {/* Weather Alerts */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Weather Alert
                        </h3>
                        <p className="text-sm text-gray-500">15 minutes ago</p>
                      </div>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Heavy rainfall expected in Punjab region. Advise farmers to
                    postpone field operations and secure crops.
                  </p>
                </div>

                {/* Urgent Query */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-red-100 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Urgent Query Alert
                        </h3>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      High Priority
                    </span>
                  </div>
                  <p className="text-gray-700">
                    New urgent query from farmer Raj Kumar regarding pest
                    infestation. Requires immediate expert attention.
                  </p>
                  <div className="mt-4">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
                      Review Query
                    </button>
                  </div>
                </div>

                {/* System Update */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          System Update
                        </h3>
                        <p className="text-sm text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Info
                    </span>
                  </div>
                  <p className="text-gray-700">
                    New analytics dashboard features available. Enhanced
                    reporting tools for better farmer query management.
                  </p>
                </div>

                {/* Market Update */}
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Market Update
                        </h3>
                        <p className="text-sm text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Market Info
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Wheat prices increased by 8% this week. Good time to advise
                    farmers on harvest timing and market strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      // case "experts":
      //   return (
      //     <div className="space-y-6">
      //       <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
      //         <h1 className="text-3xl font-bold text-slate-800 mb-6">
      //           Expert Directory
      //         </h1>
      //         <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
      //           <div className="text-center">
      //             <div className="text-4xl mb-4">👥</div>
      //             <p className="text-slate-600">Expert directory coming soon</p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   );

      case "settings":
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-6">
                Account Settings
              </h1>

              {/* Profile Information - Only Editable Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Editable Information
                    </h2>
                    <div className="space-y-4">
                      {/* Read-only information */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={
                            currentUser?.displayName || "Dr. Expert Name"
                          }
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Not editable - Contact admin to change
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Employee ID
                        </label>
                        <input
                          type="text"
                          defaultValue="EXP2025001"
                          disabled
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          System generated - Not editable
                        </p>
                      </div>

                      {/* Editable contact information */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Office Contact Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 161 2401234"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Office Location
                        </label>
                        <input
                          type="text"
                          defaultValue="Punjab Agricultural University, Ludhiana"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Assigned Districts/Regions
                        </label>
                        <textarea
                          defaultValue="Ludhiana, Bathinda, Moga, Firozpur"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-20 resize-none"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium">
                        Update Information
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Notification Preferences
                    </h2>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span className="text-sm text-gray-700">
                          Email notifications for urgent queries
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span className="text-sm text-gray-700">
                          SMS alerts for high-priority cases
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm text-gray-700">
                          Weekly summary reports
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          defaultChecked
                        />
                        <span className="text-sm text-gray-700">
                          Weather alerts for assigned regions
                        </span>
                      </label>
                    </div>
                    <div className="mt-4">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
                        Save Preferences
                      </button>
                    </div>
                  </div>

                  {/* Read-only user Information */}
                  <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      User Information
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        (View Only)
                      </span>
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="text-gray-900 font-medium">
                          Agricultural Extension
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ministry:</span>
                        <span className="text-gray-900 font-medium">
                          Ministry of Agriculture & Farmers Welfare
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience:</span>
                        <span className="text-gray-900 font-medium">
                          6-10 years
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialization:</span>
                        <span className="text-gray-900 font-medium">
                          Crop Protection, Soil Management
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Languages:</span>
                        <span className="text-gray-900 font-medium">
                          Hindi, English, Punjabi
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-blue-700">
                        📝 To update these details, please contact your system
                        administrator or HR department.
                      </p>
                    </div>
                  </div>
                </div>
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
