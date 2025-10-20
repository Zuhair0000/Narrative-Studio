import { useState } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function AuthForm({ type, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, setFormData);
  };

  const isSignUp = type === "signup";

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-[#1F2028] backdrop-blur-lg rounded-2xl p-8 shadow-lg text-white border border-white/10">
        <h2 className="text-4xl font-semibold text-center mb-6 text-orange-500">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex justify-center">
            <Button onSubmit={handleSubmit}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Processing…
                </div>
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </form>

        <p className="text-sm text-center mt-4">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-pink-400 hover:underline">
                Log in
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-pink-400 hover:underline">
                Sign up
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  );
}
