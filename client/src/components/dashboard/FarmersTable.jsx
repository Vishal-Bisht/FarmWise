import React from "react";

const FarmersTable = ({ farmers, onViewFarmer }) => {
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
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
            {farmers.map((farmer) => (
              <tr
                key={farmer.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onViewFarmer(farmer)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {getInitials(farmer.name)}
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
                    onClick={() => onViewFarmer(farmer)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    {farmer.status === "Resolved" ? "Closed" : "Respond"}
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    {farmer.status === "Resolved" ? "Archive" : "Assign"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmersTable;
