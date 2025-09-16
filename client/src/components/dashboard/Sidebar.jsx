import { motion } from "framer-motion";
import {
  HomeIcon,
  ChartBarIcon,
  CloudIcon,
  BeakerIcon,
  Cog6ToothIcon,
  BellIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  MapIcon,
  CalendarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, setIsOpen, activeSection, setActiveSection }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon, color: "emerald" },
    {
      id: "crop-recommendation",
      label: "Crop Recommendation",
      icon: BeakerIcon,
      color: "green",
    },
    {
      id: "weather-forecast",
      label: "Weather Forecast",
      icon: CloudIcon,
      color: "blue",
    },
    {
      id: "soil-analysis",
      label: "Soil Analysis",
      icon: MapIcon,
      color: "amber",
    },
    { id: "pest-alert", label: "Pest Alert", icon: BellIcon, color: "red" },
    {
      id: "ai-assistant",
      label: "AI Assistant",
      icon: ChartBarIcon,
      color: "purple",
    },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon, color: "gray" },
    { id: "profile", label: "Profile", icon: UserIcon, color: "slate" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Professional Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen w-72 bg-slate-800 flex-col z-30 shadow-2xl
        ${isOpen ? "flex" : "hidden lg:flex"}
        lg:flex
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white">FarmWise</span>
                <div className="text-xs text-slate-400">
                  Agricultural Management
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-emerald-400">156</div>
              <div className="text-xs text-slate-400">Acres</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-400">12</div>
              <div className="text-xs text-slate-400">Fields</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                    text-left font-medium transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-emerald-400"
                    }`}
                  />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
