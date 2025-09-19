import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  doSignInWithGoogle,
  doSignInWithPhone,
  setupRecaptcha,
  clearRecaptcha,
} from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Phone verification states
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);

  const { userLoggedIn } = useAuth();

  // Note: Removed automatic redirect to dashboard to allow new users to complete onboarding

  // Cleanup function for recaptcha
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        clearRecaptcha(recaptchaVerifierRef.current);
      }
    };
  }, []);

  const validatePhone = () => {
    const newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneSignup = async () => {
    if (!validatePhone()) {
      return;
    }

    setIsPhoneLoading(true);
    setErrors({});

    try {
      // Setup RecaptchaVerifier if not already initialized
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = setupRecaptcha("recaptcha-container");
      }

      const result = await doSignInWithPhone(
        phone,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(result);
      setShowPhoneVerification(true);
    } catch (error) {
      console.error("Phone signup error:", error);
      let errorMessage = "Phone signup failed. Please try again.";

      if (error.code === "auth/invalid-phone-number") {
        errorMessage = "Invalid phone number. Please check and try again.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      }

      setErrors({ phone: errorMessage });
    } finally {
      setIsPhoneLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode.trim()) {
      setErrors({ verificationCode: "Please enter the verification code" });
      return;
    }

    setIsPhoneLoading(true);
    setErrors({});

    try {
      await confirmationResult.confirm(verificationCode);
      console.log("Phone verification successful!");

      // Redirect to onboarding after successful verification
      navigate("/onboarding");
    } catch (error) {
      console.error("Verification error:", error);
      let errorMessage = "Invalid verification code. Please try again.";

      if (error.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid verification code. Please check and try again.";
      } else if (error.code === "auth/code-expired") {
        errorMessage = "Verification code expired. Please request a new one.";
      }

      setErrors({ verificationCode: errorMessage });
    } finally {
      setIsPhoneLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setErrors({});

    try {
      const result = await doSignInWithGoogle();
      console.log("Google signup successful:", result.user);

      // Redirect directly to expert onboarding after successful Google signup
      navigate("/onboarding");
    } catch (error) {
      console.error("Google signup error:", error);

      // Only show error for actual problems, not user cancellation
      if (error.code !== "auth/popup-closed-by-user") {
        let errorMessage = "Google signup failed. Please try again.";
        if (error.code === "auth/popup-blocked") {
          errorMessage =
            "Popup was blocked. Please allow popups and try again.";
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          errorMessage =
            "An account already exists with the same email address.";
        }
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Phone verification modal
  if (showPhoneVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify Your Phone Number
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter the verification code sent to {phone}
            </p>
          </div>

          <div className="space-y-4">
            {errors.general && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-800">{errors.general}</div>
              </div>
            )}

            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter 6-digit code"
                maxLength="6"
              />
              {errors.verificationCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowPhoneVerification(false)}
                className="w-1/2 flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={isPhoneLoading}
                className="w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {isPhoneLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </button>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join NilMitra
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your account to get started with smart farming
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-800">{errors.general}</div>
          </div>
        )}

        {/* Google Signup Button */}
        <div>
          <button
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isGoogleLoading ? "Signing up..." : "Continue with Google"}
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300" />
          <div className="px-4 text-sm text-gray-500">Or</div>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Phone Signup Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <button
            onClick={handlePhoneSignup}
            disabled={isPhoneLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPhoneLoading ? "Sending Code..." : "Continue with Phone"}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in here
            </button>
          </p>
        </div>

        {/* Recaptcha container for phone authentication */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignupPage;
