import React, { useEffect, useState } from "react";
import { Mail, Edit, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetPassword } from "../../middleware/userMiddleWare";
import { useNavigate } from "react-router-dom";
import { setError } from "../../redux/slices/AuthSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { forgotEmailVerified, error, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (forgotEmailVerified) {
      setEmailVerified(true);
    }
  }, [forgotEmailVerified]);

  const handleReceiveOTP = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    if (!otp) {
      dispatch(setError("OTP cannot be empty"));
      return;
    }
    dispatch(resetPassword(otp, user, newPassword)).then(() => {
      alert("Password reset successful");
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          Forgot Password
        </h2>

        {/* Form Starts Here */}
        <form onSubmit={emailVerified ? handleResetPassword : handleReceiveOTP}>
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                  emailVerified ? "bg-gray-100" : "bg-white"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailVerified}
                required
              />
              {emailVerified && (
                <button
                  type="button"
                  onClick={() => setEmailVerified(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Edit className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                </button>
              )}
            </div>

            {/* Receive OTP Button */}
            {!emailVerified && (
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 ease-in-out disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Sending..." : "Receive OTP"}
              </button>
            )}

            {/* OTP and Password Fields */}
            {emailVerified && (
              <>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 ease-in-out disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        </form>
        {/* Form Ends Here */}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
