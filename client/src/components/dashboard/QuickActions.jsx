import { motion } from "framer-motion";
import {
  PlusIcon,
  BeakerIcon,
  ChartBarIcon,
  CameraIcon,
  CalendarIcon,
  MapPinIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Add New Crop",
      description: "Register a new crop in your farm",
      icon: PlusIcon,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 2,
      title: "Record Activity",
      description: "Log farming activities",
      icon: BeakerIcon,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Capture Photo",
      description: "Take crop monitoring photos",
      icon: CameraIcon,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Schedule Task",
      description: "Plan upcoming farm work",
      icon: CalendarIcon,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      id: 5,
      title: "View Farm Map",
      description: "Explore your farm layout",
      icon: MapPinIcon,
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      id: 6,
      title: "Farm Settings",
      description: "Configure farm preferences",
      icon: Cog6ToothIcon,
      color: "from-gray-400 to-gray-600",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Quick Actions</h3>
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <PlusIcon className="w-4 h-4 text-white" />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 4,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center space-x-4 p-4 rounded-xl hover:shadow-md transition-all duration-200 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200"
            >
              <div className={`p-3 rounded-lg ${action.bgColor}`}>
                <Icon className={`w-5 h-5 ${action.textColor}`} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-800">{action.title}</div>
                <div className="text-sm text-gray-500">
                  {action.description}
                </div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <div className="font-medium text-gray-800">AI Recommendation</div>
            <div className="text-sm text-gray-600">
              Consider planting cover crops next month
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;
