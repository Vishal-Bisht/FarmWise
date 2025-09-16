import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  CloudIcon,
} from "@heroicons/react/24/outline";

const StatsOverview = () => {
  const stats = [
    {
      id: 1,
      title: "Total Crop Yield",
      value: "2,847 kg",
      change: "+12.5%",
      trend: "up",
      icon: BeakerIcon,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      description: "This month",
    },
    {
      id: 2,
      title: "Revenue Generated",
      value: "₹1,24,500",
      change: "+8.2%",
      trend: "up",
      icon: CurrencyDollarIcon,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      description: "This month",
    },
    {
      id: 3,
      title: "Farm Efficiency",
      value: "89.5%",
      change: "+5.1%",
      trend: "up",
      icon: ChartBarIcon,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      description: "Overall score",
    },
    {
      id: 4,
      title: "Weather Score",
      value: "Excellent",
      change: "92/100",
      trend: "up",
      icon: CloudIcon,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      description: "Next 7 days",
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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Farm Overview</h2>
        <p className="text-gray-600">Your farm's performance at a glance</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon =
            stat.trend === "up" ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 },
              }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === "up"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">
                  {stat.title}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>

              {/* Animated progress bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 40 + 60}%` }}
                    transition={{ duration: 1, delay: stat.id * 0.1 }}
                    className={`h-1 rounded-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsOverview;
