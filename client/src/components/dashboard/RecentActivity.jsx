import { motion } from "framer-motion";
import {
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  BeakerIcon,
  CameraIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "harvest",
      title: "Wheat Harvested",
      description: "Completed wheat harvest in Field A",
      time: "2 hours ago",
      icon: CheckCircleIcon,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      type: "planting",
      title: "Corn Seeds Planted",
      description: "Planted corn in Field B, Section 1",
      time: "5 hours ago",
      icon: BeakerIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      type: "maintenance",
      title: "Equipment Serviced",
      description: "Tractor maintenance completed",
      time: "1 day ago",
      icon: WrenchScrewdriverIcon,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 4,
      type: "monitoring",
      title: "Crop Health Check",
      description: "Photographed tomato plants for disease monitoring",
      time: "2 days ago",
      icon: CameraIcon,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      id: 5,
      type: "alert",
      title: "Low Soil Moisture Alert",
      description: "Field C requires irrigation",
      time: "3 days ago",
      icon: ExclamationCircleIcon,
      color: "text-red-500",
      bgColor: "bg-red-50",
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
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
        <ClockIcon className="w-6 h-6 text-gray-400" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {activities.slice(0, 5).map((activity, index) => {
          const Icon = activity.icon;

          return (
            <motion.div
              key={activity.id}
              variants={itemVariants}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 truncate">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-gray-500 ml-2">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6"
      >
        <button className="w-full py-2 text-center text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors">
          View All Activity →
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RecentActivity;
