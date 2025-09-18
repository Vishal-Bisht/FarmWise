import React from "react";

const Settings = ({ currentUser }) => {
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
                    defaultValue={currentUser?.displayName || "Dr. Expert Name"}
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
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-sm text-gray-700">
                    Email notifications for urgent queries
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
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
                  <input type="checkbox" className="mr-3" defaultChecked />
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
                  <span className="text-gray-900 font-medium">6-10 years</span>
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
};

export default Settings;
