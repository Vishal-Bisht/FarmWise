import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

const DashboardHeader = ({ user, onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const userName = user?.displayName?.split(" ")[0] || "Farmer";

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-slate-200 shadow-sm"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bars3Icon className="w-6 h-6 text-slate-600" />
            </button>

            {/* Search Bar */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fields, crops, reports..."
                className="w-80 pl-12 pr-4 py-2.5 bg-slate-100 border-0 rounded-lg text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Center Section - Quick Stats */}
          <div className="hidden xl:flex items-center space-x-8">
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-800">
                {currentTime}
              </div>
              <div className="text-xs text-slate-500">{currentDate}</div>
            </div>
            <div className="h-8 w-px bg-slate-300"></div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">12 Active Fields</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-sm text-slate-600">3 Alerts</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors group">
                <BellIcon className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              </button>
              <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors group">
                <Cog6ToothIcon className="w-5 h-5 text-slate-600 group-hover:text-slate-800" />
              </button>
            </div>

            <div className="h-6 w-px bg-slate-300 hidden lg:block"></div>

            {/* User Profile */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-semibold text-sm">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-slate-800">
                      {userName}
                    </div>
                    <div className="text-xs text-slate-500">Farm Manager</div>
                  </div>
                </div>
                <ChevronDownIcon className="w-4 h-4 text-slate-500" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-200">
                    <p className="text-sm font-medium text-slate-800">
                      {user?.displayName || "Farm Manager"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user?.email || "farmer@farmwise.com"}
                    </p>
                  </div>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-slate-50" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-slate-700`}
                      >
                        <UserIcon className="w-4 h-4 mr-3 text-slate-500" />
                        Your Profile
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-slate-50" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-slate-700`}
                      >
                        <Cog6ToothIcon className="w-4 h-4 mr-3 text-slate-500" />
                        Settings
                      </button>
                    )}
                  </Menu.Item>

                  <div className="border-t border-slate-200 my-2"></div>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-slate-50" : ""
                        } flex items-center w-full px-4 py-2 text-sm text-slate-700`}
                      >
                        <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-slate-500" />
                        Sign Out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
