import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const FarmerOnboardingForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",

    // Farm Information
    farmName: "",
    farmLocation: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    coordinates: { lat: "", lng: "" },

    // Land & Farm Details
    totalLandSize: "",
    landUnit: "acres", // acres, hectares
    ownedLand: "",
    leasedLand: "",
    soilType: "",
    irrigationType: "",
    waterSource: "",

    // Crop Information
    primaryCrops: [],
    secondaryCrops: [],
    farmingExperience: "",
    farmingType: "", // organic, conventional, mixed

    // Production & Business
    annualProduction: "",
    productionUnit: "",
    marketingChannels: [],
    certifications: [],

    // Technology & Equipment
    equipmentOwned: [],
    technologyUsed: [],
    internetAvailability: "",

    // Goals & Preferences
    farmingGoals: [],
    challenges: [],
    interestAreas: [],
  });

  const steps = [
    {
      id: 1,
      title: "Personal Info",
      description: "Basic information about you",
    },
    {
      id: 2,
      title: "Farm Location",
      description: "Where is your farm located",
    },
    {
      id: 3,
      title: "Land Details",
      description: "Size and characteristics of your land",
    },
    { id: 4, title: "Crops & Production", description: "What do you grow" },
    {
      id: 5,
      title: "Equipment & Technology",
      description: "Tools and technology you use",
    },
    {
      id: 6,
      title: "Goals & Preferences",
      description: "Your farming objectives",
    },
  ];

  const cropOptions = [
    "Wheat",
    "Rice",
    "Corn",
    "Soybeans",
    "Cotton",
    "Sugarcane",
    "Potatoes",
    "Tomatoes",
    "Onions",
    "Carrots",
    "Cabbage",
    "Lettuce",
    "Spinach",
    "Beans",
    "Peas",
    "Barley",
    "Oats",
    "Sorghum",
    "Millet",
    "Sunflower",
    "Canola",
    "Tobacco",
    "Tea",
    "Coffee",
  ];

  const soilTypes = [
    "Clay",
    "Sandy",
    "Loamy",
    "Silty",
    "Peaty",
    "Chalky",
    "Sandy Loam",
    "Clay Loam",
  ];

  const irrigationTypes = [
    "Drip Irrigation",
    "Sprinkler",
    "Flood Irrigation",
    "Furrow",
    "Rain-fed",
    "Manual Watering",
  ];

  const equipmentOptions = [
    "Tractor",
    "Harvester",
    "Plough",
    "Cultivator",
    "Seeder",
    "Sprayer",
    "Thresher",
    "Irrigation Equipment",
    "Storage Facilities",
    "Processing Equipment",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Update Firebase user profile
      await updateProfile(currentUser, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Here you would typically save the form data to your database
      console.log("Farmer data to save:", formData);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving farmer data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Farm Location
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Farm Name *
              </label>
              <input
                type="text"
                value={formData.farmName}
                onChange={(e) => handleInputChange("farmName", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter your farm name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Farm Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Enter complete farm address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Land & Farm Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Total Land Size *
                </label>
                <div className="flex">
                  <input
                    type="number"
                    value={formData.totalLandSize}
                    onChange={(e) =>
                      handleInputChange("totalLandSize", e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="0"
                  />
                  <select
                    value={formData.landUnit}
                    onChange={(e) =>
                      handleInputChange("landUnit", e.target.value)
                    }
                    className="px-4 py-3 border border-l-0 border-slate-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="bigha">Bigha</option>
                    <option value="katha">Katha</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Soil Type *
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) =>
                    handleInputChange("soilType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Soil Type</option>
                  {soilTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Irrigation Type *
                </label>
                <select
                  value={formData.irrigationType}
                  onChange={(e) =>
                    handleInputChange("irrigationType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Irrigation Type</option>
                  {irrigationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Water Source
                </label>
                <select
                  value={formData.waterSource}
                  onChange={(e) =>
                    handleInputChange("waterSource", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Water Source</option>
                  <option value="well">Well</option>
                  <option value="borewell">Borewell</option>
                  <option value="river">River</option>
                  <option value="canal">Canal</option>
                  <option value="reservoir">Reservoir</option>
                  <option value="rainwater">Rainwater</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Crops & Production
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Primary Crops * (Select main crops you grow)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {cropOptions.slice(0, 16).map((crop) => (
                  <label
                    key={crop}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.primaryCrops.includes(crop)}
                      onChange={() => handleArrayToggle("primaryCrops", crop)}
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{crop}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Farming Experience *
                </label>
                <select
                  value={formData.farmingExperience}
                  onChange={(e) =>
                    handleInputChange("farmingExperience", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Experience</option>
                  <option value="less-than-1">Less than 1 year</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10-20">10-20 years</option>
                  <option value="more-than-20">More than 20 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Farming Type *
                </label>
                <select
                  value={formData.farmingType}
                  onChange={(e) =>
                    handleInputChange("farmingType", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                >
                  <option value="">Select Farming Type</option>
                  <option value="organic">Organic</option>
                  <option value="conventional">Conventional</option>
                  <option value="mixed">Mixed (Organic + Conventional)</option>
                  <option value="sustainable">Sustainable</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Annual Production Capacity
              </label>
              <div className="flex">
                <input
                  type="number"
                  value={formData.annualProduction}
                  onChange={(e) =>
                    handleInputChange("annualProduction", e.target.value)
                  }
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-l-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="0"
                />
                <select
                  value={formData.productionUnit}
                  onChange={(e) =>
                    handleInputChange("productionUnit", e.target.value)
                  }
                  className="px-4 py-3 border border-l-0 border-slate-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                >
                  <option value="">Unit</option>
                  <option value="tons">Tons</option>
                  <option value="quintals">Quintals</option>
                  <option value="kg">Kilograms</option>
                  <option value="bushels">Bushels</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Equipment & Technology
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Equipment Owned (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {equipmentOptions.map((equipment) => (
                  <label
                    key={equipment}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.equipmentOwned.includes(equipment)}
                      onChange={() =>
                        handleArrayToggle("equipmentOwned", equipment)
                      }
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{equipment}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Technology Used (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Smartphone Apps",
                  "GPS/Precision Agriculture",
                  "Drone Technology",
                  "Soil Sensors",
                  "Weather Stations",
                  "Automated Irrigation",
                  "Farm Management Software",
                  "E-commerce Platforms",
                ].map((tech) => (
                  <label
                    key={tech}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.technologyUsed.includes(tech)}
                      onChange={() => handleArrayToggle("technologyUsed", tech)}
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{tech}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Internet Availability
              </label>
              <select
                value={formData.internetAvailability}
                onChange={(e) =>
                  handleInputChange("internetAvailability", e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="">Select Internet Availability</option>
                <option value="high-speed">High-speed Internet</option>
                <option value="moderate">Moderate Speed</option>
                <option value="low-speed">Low Speed</option>
                <option value="mobile-only">Mobile Data Only</option>
                <option value="limited">Limited/No Internet</option>
              </select>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Goals & Preferences
            </h3>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Farming Goals (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Increase Yield",
                  "Reduce Costs",
                  "Improve Soil Health",
                  "Water Conservation",
                  "Pest Management",
                  "Market Expansion",
                  "Organic Certification",
                  "Technology Adoption",
                  "Sustainable Practices",
                  "Crop Diversification",
                ].map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.farmingGoals.includes(goal)}
                      onChange={() => handleArrayToggle("farmingGoals", goal)}
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{goal}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Current Challenges (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Weather Uncertainty",
                  "Pest & Diseases",
                  "Market Price Fluctuation",
                  "Water Scarcity",
                  "Soil Degradation",
                  "Labor Shortage",
                  "High Input Costs",
                  "Lack of Technology",
                  "Storage Issues",
                  "Transportation",
                ].map((challenge) => (
                  <label
                    key={challenge}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.challenges.includes(challenge)}
                      onChange={() =>
                        handleArrayToggle("challenges", challenge)
                      }
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{challenge}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Areas of Interest (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Crop Recommendations",
                  "Weather Forecasting",
                  "Pest Alerts",
                  "Market Prices",
                  "Soil Analysis",
                  "Irrigation Management",
                  "Financial Planning",
                  "Government Schemes",
                  "Training Programs",
                  "Networking",
                ].map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.interestAreas.includes(interest)}
                      onChange={() =>
                        handleArrayToggle("interestAreas", interest)
                      }
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Complete Your Profile
            </h2>
            <span className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </span>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <div
                  className={`h-2 rounded-full ${
                    step.id <= currentStep ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-600">
            {steps[currentStep - 1]?.description}
          </p>
        </div>

        {/* Form Content */}
        <div className="mb-8">{renderStep()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep === 1 ? (
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </button>
          ) : (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
            >
              Previous
            </button>
          )}

          {currentStep === steps.length ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Completing..." : "Complete Setup"}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FarmerOnboardingForm;
