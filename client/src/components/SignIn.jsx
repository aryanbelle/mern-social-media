import React, { useState } from "react";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");  // Accept either email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setError("Please fill in both fields");
    } else {
      setError("");
      // Implement your login logic here
      console.log("Logged in successfully with", { emailOrUsername, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl flex rounded-lg shadow-lg">
        {/* Left Side: Form */}
        <div className="w-full max-w-md p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-700">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">
                Email or Username
              </label>
              <input
                type="text"
                value={emailOrUsername}
                required
                onChange={(e) => setEmailOrUsername(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email or username"
              />
            </div>
            <div>
              <label className="block text-sm text-left font-medium text-gray-600">Password</label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-blue-500 hover:text-blue-700">
                <a href="/forgot-password">Forgot password?</a>
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-800 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="hidden lg:flex w-1/2 bg-blue-50 rounded-r-lg items-center justify-center">
          <img
            src="https://via.placeholder.com/400x300" // Replace with your own illustration image
            alt="Login Illustration"
            className="w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
