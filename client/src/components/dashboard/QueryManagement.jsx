import React from "react";
import { mockResolvedQueries, queryStats } from "../../data/mockData";

const QueryManagement = () => {
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
                {mockResolvedQueries.map((query) => (
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
          {queryStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border"
            >
              <div className="text-center">
                <div className={`text-2xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QueryManagement;
