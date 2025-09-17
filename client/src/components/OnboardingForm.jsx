import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";

const OnboardingForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    employeeId: "",

    // Professional Information
    department: "",
    ministry: "",
    designation: "",
    workLocation: "",

    // Contact Information
    officialEmail: "",
    officeAddress: "",

    // Specialization
    expertise: [], // e.g., ["Crop Management", "Soil Science", "Irrigation"]
    yearsOfExperience: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleExpertiseChange = (expertise) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(expertise)
        ? prev.expertise.filter((e) => e !== expertise)
        : [...prev.expertise, expertise],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.employeeId.trim())
      newErrors.employeeId = "Employee ID is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.ministry.trim()) newErrors.ministry = "Ministry is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.workLocation.trim())
      newErrors.workLocation = "Work location is required";
    if (!formData.officialEmail.trim()) {
      newErrors.officialEmail = "Official email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.officialEmail)) {
      newErrors.officialEmail = "Please enter a valid email address";
    }
    if (!formData.yearsOfExperience.trim())
      newErrors.yearsOfExperience = "Experience is required";
    if (formData.expertise.length === 0)
      newErrors.expertise = "Please select at least one area of expertise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        console.error("No authenticated user found");
        alert("Authentication error. Please try logging in again.");
        navigate("/login");
        return;
      }

      // Update Firebase user profile
      await updateProfile(auth.currentUser, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Here you would typically save the expert data to your database
      console.log("Expert data to save:", formData);

      alert("Profile created successfully! Welcome to FarmWise Expert Portal.");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving expert profile:", error);
      alert("Failed to create profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const expertiseOptions = [
    "Crop Management",
    "Soil Science",
    "Plant Pathology",
    "Entomology",
    "Agricultural Engineering",
    "Irrigation & Water Management",
    "Organic Farming",
    "Horticulture",
    "Animal Husbandry",
    "Agricultural Economics",
    "Farm Mechanization",
    "Seed Technology",
  ];

  const ministryOptions = [
    "Ministry of Agriculture & Farmers Welfare",
    "Ministry of Rural Development",
    "Ministry of Food Processing Industries",
    "Ministry of Water Resources",
    "State Agriculture Department",
    "Agricultural Research Council",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 z-10"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Expert Profile
            </h1>
            <p className="mt-2 text-gray-600">
              Please provide your professional details to access the FarmWise
              Expert Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="employeeId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    id="employeeId"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your employee ID"
                  />
                  {errors.employeeId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.employeeId}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="officialEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Official Email *
                  </label>
                  <input
                    type="email"
                    id="officialEmail"
                    name="officialEmail"
                    value={formData.officialEmail}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your official email"
                  />
                  {errors.officialEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.officialEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="ministry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ministry/Department *
                  </label>
                  <select
                    id="ministry"
                    name="ministry"
                    value={formData.ministry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Ministry</option>
                    {ministryOptions.map((ministry) => (
                      <option key={ministry} value={ministry}>
                        {ministry}
                      </option>
                    ))}
                  </select>
                  {errors.ministry && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.ministry}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department *
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your department"
                  />
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.department}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation *
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Agricultural Officer, Senior Scientist"
                  />
                  {errors.designation && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.designation}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="workLocation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Location *
                  </label>
                  <input
                    type="text"
                    id="workLocation"
                    name="workLocation"
                    value={formData.workLocation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your work location"
                  />
                  {errors.workLocation && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.workLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="yearsOfExperience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Years of Experience *
                  </label>
                  <select
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                  {errors.yearsOfExperience && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="officeAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Address
                  </label>
                  <textarea
                    id="officeAddress"
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your office address"
                  />
                </div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Areas of Expertise *
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select all areas that match your expertise (minimum 1 required)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {expertiseOptions.map((expertise) => (
                  <label key={expertise} className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.expertise.includes(expertise)}
                      onChange={() => handleExpertiseChange(expertise)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.expertise.includes(expertise)
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-green-300"
                      }`}
                    >
                      <span className="text-sm font-medium">{expertise}</span>
                    </div>
                  </label>
                ))}
              </div>
              {errors.expertise && (
                <p className="mt-2 text-sm text-red-600">{errors.expertise}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Profile..." : "Complete Profile"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingForm;
