import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

const FarmerDetailsView = ({ farmer, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [advice, setAdvice] = useState("");

  // Reset tab when viewing a new farmer
  useEffect(() => {
    if (farmer) {
      setActiveTab("overview");
      setAdvice("");
    }
  }, [farmer?.id]);

  const handleSendAdvice = () => {
    if (!advice.trim()) return;
    alert("Advice sent successfully!");
    setAdvice("");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!farmer) return null;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "farm", label: "Farm Details" },
    { id: "query", label: "Current Query" },
    { id: "history", label: "History" },
  ];

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
            onClick={onBack}
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
              {getInitials(farmer.name)}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{farmer.name}</h2>
            <div className="flex items-center text-gray-500 mt-1">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span>{farmer.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="px-6 pt-6 -mb-px flex space-x-8">
            {tabs.map((tab) => (
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
                    <span className="text-gray-900">{farmer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <HomeIcon className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{farmer.farmSize}</span>
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
                      {farmer.totalQueries}
                    </div>
                    <div className="text-sm text-blue-600">Total Queries</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {farmer.pendingQueries}
                    </div>
                    <div className="text-sm text-orange-600">Pending</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "farm" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Farm Size</h4>
                  <p className="text-gray-700">{farmer.farmSize}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Soil Type</h4>
                  <p className="text-gray-700">{farmer.soilType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Crops Grown
                  </h4>
                  <p className="text-gray-700">{farmer.crops}</p>
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
                  <p className="text-gray-800">{farmer.query}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">
                      Submitted {farmer.queryTime}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        farmer.status === "New Query"
                          ? "bg-red-100 text-red-800"
                          : farmer.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {farmer.status}
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

          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Query History
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      Previous wheat disease query
                    </h4>
                    <span className="text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Successfully resolved with fungicide treatment
                    recommendation.
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Resolved
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      Soil testing inquiry
                    </h4>
                    <span className="text-xs text-gray-500">1 month ago</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Provided soil testing lab contacts and preparation
                    guidelines.
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Resolved
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FarmerDetailsView;
