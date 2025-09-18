import React from "react";
import { mockNotifications } from "../../data/mockData";

const NotificationIcon = ({ type, priority }) => {
  const colorClasses = {
    warning: "bg-yellow-100 text-yellow-600",
    urgent: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-600",
    success: "bg-green-100 text-green-600",
  };

  const icons = {
    weather: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    query: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
      />
    ),
    system: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
    market: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  };

  return (
    <div className={`p-2 rounded-lg mr-4 ${colorClasses[priority]}`}>
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {icons[type]}
      </svg>
    </div>
  );
};

const NotificationCard = ({ notification }) => {
  const borderColors = {
    warning: "border-yellow-500",
    urgent: "border-red-500",
    info: "border-blue-500",
    success: "border-green-500",
  };

  const statusColors = {
    warning: "bg-yellow-100 text-yellow-800",
    urgent: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
  };

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
        borderColors[notification.priority]
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <NotificationIcon
            type={notification.type}
            priority={notification.priority}
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {notification.title}
            </h3>
            <p className="text-sm text-gray-500">{notification.time}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[notification.priority]
          }`}
        >
          {notification.status}
        </span>
      </div>
      <p className="text-gray-700">{notification.message}</p>
      {notification.priority === "urgent" && (
        <div className="mt-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700">
            Review Query
          </button>
        </div>
      )}
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Expert Notifications
        </h1>

        <div className="space-y-4">
          {mockNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
