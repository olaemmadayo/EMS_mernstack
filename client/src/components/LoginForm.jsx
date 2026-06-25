import React from "react";
import LoginLeftSide from "./LoginLeftSide";
import { ArrowLeftIcon, EyeOffIcon, EyeIcon, Loader2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <LoginLeftSide />
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-10"
          >
            <ArrowLeftIcon size={16} /> Back to portals
          </Link>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-medium text-zinc-800">
              {title}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">{subtitle}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-3 rounded-md text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-11 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 inset-y-0 mb-1 text-slate-400 hover:text-slate-600 transition-colors "
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}{" "}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold rounded-md hover:from-indigo-700 hover:to-indigo-700   disable:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 active:scale[0.98]"
            >
              {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2" />}
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
