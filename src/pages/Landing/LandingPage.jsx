import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../middleware/userMiddleWare";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/AuthSlice";

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if user is logged in on initial load
    const userData = localStorage.getItem("user");
    if (userData) {
      // Parse the user data and dispatch login success
      dispatch(loginSuccess(userData));
      navigate("/home"); // Redirect to the home page
    }
  }, [dispatch, navigate]);

  // Validate the user email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle form submit events
  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        formErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});

    if (isLogin) {
      dispatch(login(email, password))
        .then(() => {
          navigate("/home"); // Navigate after successful login
        })
        .catch((err) => {
          console.log(err);

          setErrors({ general: "Invalid credentials, please try again." });
        });
    } else {
      dispatch(signup({ name, email, password }))
        .then(() => {
          navigate("/home"); // Navigate after successful signup
        })
        .catch((err) => {
          setErrors({ general: "Error during signup. Please try again." });
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Product Info */}
      <div className="w-full md:w-1/2 bg-blue-600 p-8 flex items-center justify-center">
        <div className="text-white max-w-lg">
          <h1 className="text-4xl font-bold mb-6">
            Transform Your Life with NutriConnect
          </h1>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Nutrition Plans
              </h3>
              <p>
                Get custom meal plans designed by certified dietitians tailored
                to your goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Track Your Progress
              </h3>
              <p>
                Monitor your journey with our intuitive tracking tools and
                weekly insights.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p>
                Connect with experienced dietitians who understand your unique
                needs.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p>Join thousands of others on their journey to better health.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? "Login" : "Create Account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin
                ? "Your journey to better health continues here"
                : "Start your journey to better health"}
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                className={`px-6 py-2 rounded-lg w-32 transition-colors ${
                  isLogin
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`px-6 py-2 rounded-lg w-32 transition-colors ${
                  !isLogin
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor={isLogin ? "loginEmail" : "signupEmail"}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  id={isLogin ? "loginEmail" : "signupEmail"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor={isLogin ? "loginPassword" : "signupPassword"}
                >
                  Password
                </label>
                <input
                  type="password"
                  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  id={isLogin ? "loginPassword" : "signupPassword"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="signupConfirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                    id="signupConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {errors.confirmPassword && (
                    <div className="mt-1 w-full text-red-600">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                {isLogin && (
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
              {errors.general && (
                <div className="mt-2 w-full text-red-600">{errors.general}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
