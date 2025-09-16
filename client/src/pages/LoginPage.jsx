import { useState, useRef, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle } from "../firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);
  const { userLoggedIn } = useAuth ? useAuth() : {};

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (error) {
          console.log("Error clearing recaptcha:", error);
        }
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  // Firebase Phone Auth
  const handleSendOtp = async () => {
    if (!phone) {
      setError("Please enter a phone number");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const auth = getAuth();

      // Clear any existing recaptcha before creating new one
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (clearError) {
          console.log("Error clearing existing recaptcha:", clearError);
        }
        recaptchaVerifierRef.current = null;
      }

      const recaptchaContainer = document.getElementById("sign-in-button");
      if (recaptchaContainer) {
        recaptchaContainer.innerHTML = "";
      }

      // Create new RecaptchaVerifier
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            // reCAPTCHA expired
            setError("reCAPTCHA expired. Please try again.");
            if (recaptchaVerifierRef.current) {
              try {
                recaptchaVerifierRef.current.clear();
              } catch (clearError) {
                console.log("Error clearing expired recaptcha:", clearError);
              }
              recaptchaVerifierRef.current = null;
            }
          },
          "error-callback": (error) => {
            console.log("reCAPTCHA error:", error);
            setError("reCAPTCHA error. Please try again.");
          },
        }
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(confirmation);
      setShowOtpInput(true);
      setError("");
      alert("OTP sent to your phone!");
    } catch (err) {
      console.log("Phone signup error:", err);

      // Clean up recaptcha on error
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear();
        } catch (clearError) {
          console.log("Error clearing recaptcha after error:", clearError);
        }
        recaptchaVerifierRef.current = null;
      }

      let errorMessage = "Failed to send OTP. Please try again.";
      if (err.code === "auth/invalid-phone-number") {
        errorMessage =
          "Invalid phone number format. Please use format: +1234567890";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later.";
      } else if (err.message && err.message.includes("reCAPTCHA")) {
        errorMessage =
          "reCAPTCHA error. Please refresh the page and try again.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const result = await confirmationResult.confirm(otp);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      const result = await doSignInWithGoogle();
      console.log("Google login successful:", result.user);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);

      // Only show error for actual problems, not user cancellation
      if (error.code !== "auth/popup-closed-by-user") {
        let errorMessage = "Google login failed. Please try again.";
        if (error.code === "auth/popup-blocked") {
          errorMessage =
            "Popup was blocked. Please allow popups and try again.";
        } else if (error.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your connection.";
        }
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome Back to FarmWise
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Create one here
            </button>
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Phone Login */}
          {/* The button below is used for invisible reCAPTCHA */}
          <button id="sign-in-button" style={{ display: "none" }} />
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
                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="+91 1234567890"
              />
            </div>
            {showOtpInput && (
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter OTP"
                />
              </div>
            )}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            <div>
              {!showOtpInput ? (
                <button
                  type="button"
                  disabled={isLoading || !phone}
                  onClick={handleSendOtp}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isLoading || !otp}
                  onClick={handleVerifyOtp}
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {isLoading ? "Verifying..." : "Verify OTP & Login"}
                </button>
              )}
            </div>
          </div>

          {/* Or continue with Google */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-blue-100 hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
              >
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">
                  {isLoading ? "Signing in..." : "Google"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
