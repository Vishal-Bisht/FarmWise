import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  MapPinIcon,
  PhoneIcon,
  HomeIcon,
  BeakerIcon,
  CloudIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const FarmerDetailsModal = ({ isOpen, onClose, farmer }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [advice, setAdvice] = useState("");

  // Reset tab when opening modal with new farmer
  useEffect(() => {
    if (isOpen && farmer) {
      setActiveTab("overview");
      setAdvice("");
    }
  }, [isOpen, farmer?.id]);

  const handleSendAdvice = () => {
    if (!advice.trim()) return;

    // TODO: Send advice to backend
    console.log("Sending advice to farmer:", farmer.name, "Advice:", advice);
    alert("Advice sent successfully!");
    setAdvice("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && farmer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-start justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="inline-block w-full max-w-7xl mx-auto px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white shadow-2xl rounded-xl sm:my-8 sm:align-middle sm:p-8 relative z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {farmer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {farmer.name}
                    </h2>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{farmer.location}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
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
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Contact Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <span>{farmer.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <HomeIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <span>{farmer.farmSize}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Quick Stats
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {farmer.totalQueries || 12}
                            </div>
                            <div className="text-sm text-gray-500">
                              Total Queries
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">
                              {farmer.pendingQueries || 2}
                            </div>
                            <div className="text-sm text-gray-500">Pending</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {farmer.satisfaction || "92%"}
                            </div>
                            <div className="text-sm text-gray-500">
                              Satisfaction
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "farm" && (
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Farm Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Farm Size
                            </label>
                            <p className="text-lg font-semibold">
                              {farmer.farmSize}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Crops
                            </label>
                            <p className="text-lg font-semibold">
                              {farmer.crops}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Soil Type
                            </label>
                            <p className="text-lg font-semibold">
                              {farmer.soilType}
                            </p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-500">
                              Irrigation
                            </label>
                            <p className="text-lg font-semibold">
                              {farmer.irrigation || "Drip + Sprinkler"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Current Season
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Planting Status</span>
                            <span className="font-semibold text-green-600">
                              75% Complete
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Expected Harvest</span>
                            <span className="font-semibold">Oct 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Weather Risk</span>
                            <span className="font-semibold text-yellow-600">
                              Medium
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "query" && (
                    <div className="space-y-6">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-red-800">
                            Current Query
                          </h3>
                          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                            {farmer.priority} Priority
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{farmer.query}</p>
                        <div className="text-sm text-gray-500">
                          Submitted: {farmer.queryTime}
                        </div>
                      </div>

                      {farmer.attachments && (
                        <div className="bg-gray-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-4">
                            Attachments
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                              <div className="w-full h-32 bg-gray-200 rounded-lg mb-2"></div>
                              <p className="text-sm text-gray-600">
                                Field Photo 1
                              </p>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-4 text-center">
                              <div className="w-full h-32 bg-gray-200 rounded-lg mb-2"></div>
                              <p className="text-sm text-gray-600">
                                Soil Test Report
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">
                              Fertilizer Recommendation
                            </h4>
                            <p className="text-gray-600 text-sm">
                              Advised NPK 10:26:26 for wheat crop
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            2 weeks ago
                          </span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">Pest Management</h4>
                            <p className="text-gray-600 text-sm">
                              Provided organic pest control solution
                            </p>
                          </div>
                          <span className="text-xs text-gray-500">
                            1 month ago
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Advice Panel */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 sticky top-0">
                    <h3 className="text-lg font-semibold mb-4">
                      Send Expert Advice
                    </h3>
                    <textarea
                      value={advice}
                      onChange={(e) => setAdvice(e.target.value)}
                      placeholder="Provide your expert advice to help the farmer solve their query..."
                      className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="mt-4 space-y-2">
                      <button
                        onClick={handleSendAdvice}
                        disabled={!advice.trim()}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Send Advice
                      </button>
                      <button
                        onClick={onClose}
                        className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold mb-3">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-colors">
                          📞 Schedule Call
                        </button>
                        <button className="w-full text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-colors">
                          📋 Request Soil Test
                        </button>
                        <button className="w-full text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-colors">
                          🌦️ Send Weather Alert
                        </button>
                        <button className="w-full text-left p-2 rounded-lg hover:bg-white hover:shadow-sm transition-colors">
                          📚 Share Resources
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FarmerDetailsModal;
