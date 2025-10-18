import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleForm = (form) => setIsLogin(form === "login");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Login submitted" : "Signup submitted");
  };

  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F9FAFB", fontFamily: "Lexend" }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-lg bg-white">
        {/* Tab Navigation */}
        <div className="flex justify-around bg-[#F9FAFB] p-2 rounded-t-3xl mb-6">
          <button
            onClick={() => toggleForm("login")}
            className={`w-1/2 py-2 rounded-2xl font-semibold transition-all ${
              isLogin ? "bg-[#177529] text-white shadow-md" : "text-[#0C0D19]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => toggleForm("signup")}
            className={`w-1/2 py-2 rounded-2xl font-semibold transition-all ${
              !isLogin ? "bg-[#177529] text-white shadow-md" : "text-[#0C0D19]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Slider Container */}
        <div
          className="flex w-[200%] transition-transform duration-500"
          style={{ transform: isLogin ? "translateX(0%)" : "translateX(-50%)" }}
        >
          {/* Login Form */}
          <div className="w-1/2 p-10 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="email"
                  id="login-email"
                  placeholder=" "
                  className="peer w-full p-4 rounded-lg border border-gray-300 focus:border-[#177529] focus:ring-1 focus:ring-[#177529] focus:outline-none text-[#0C0D19]"
                  style={{ backgroundColor: "#F9FAFB" }}
                />
                <label
                  htmlFor="login-email"
                  className="absolute left-4 top-4 text-gray-400 text-sm
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                             peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#177529] transition-all"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="login-password"
                  placeholder=" "
                  className="peer w-full p-4 rounded-lg border border-gray-300 focus:border-[#177529] focus:ring-1 focus:ring-[#177529] focus:outline-none text-[#0C0D19]"
                  style={{ backgroundColor: "#F9FAFB" }}
                />
                <label
                  htmlFor="login-password"
                  className="absolute left-4 top-4 text-gray-400 text-sm
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                             peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#177529] transition-all"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="p-4 rounded-xl font-bold text-white hover:brightness-105 transition-all shadow-md"
                style={{ backgroundColor: "#177529" }}
              >
                Login
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 flex flex-col gap-4">
              <p className="text-center text-gray-500 font-medium">Or sign in with</p>
              <div className="flex justify-center gap-4">
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:shadow-md transition-all w-24">
                  <FcGoogle size={20} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:shadow-md transition-all w-24">
                  <FaApple size={18} /> Apple
                </button>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="w-1/2 p-10 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  id="signup-name"
                  placeholder=" "
                  className="peer w-full p-4 rounded-lg border border-gray-300 focus:border-[#177529] focus:ring-1 focus:ring-[#177529] focus:outline-none text-[#0C0D19]"
                  style={{ backgroundColor: "#F9FAFB" }}
                />
                <label
                  htmlFor="signup-name"
                  className="absolute left-4 top-4 text-gray-400 text-sm
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                             peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#177529] transition-all"
                >
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="signup-email"
                  placeholder=" "
                  className="peer w-full p-4 rounded-lg border border-gray-300 focus:border-[#177529] focus:ring-1 focus:ring-[#177529] focus:outline-none text-[#0C0D19]"
                  style={{ backgroundColor: "#F9FAFB" }}
                />
                <label
                  htmlFor="signup-email"
                  className="absolute left-4 top-4 text-gray-400 text-sm
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                             peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#177529] transition-all"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  type="password"
                  id="signup-password"
                  placeholder=" "
                  className="peer w-full p-4 rounded-lg border border-gray-300 focus:border-[#177529] focus:ring-1 focus:ring-[#177529] focus:outline-none text-[#0C0D19]"
                  style={{ backgroundColor: "#F9FAFB" }}
                />
                <label
                  htmlFor="signup-password"
                  className="absolute left-4 top-4 text-gray-400 text-sm
                             peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                             peer-placeholder-shown:text-gray-400
                             peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#177529] transition-all"
                >
                  Password
                </label>
              </div>

              <button
                type="submit"
                className="p-4 rounded-xl font-bold text-white hover:brightness-105 transition-all shadow-md"
                style={{ backgroundColor: "#177529" }}
              >
                Sign Up
              </button>
            </form>

            {/* Social Sign Up */}
            <div className="mt-6 flex flex-col gap-4">
              <p className="text-center text-gray-500 font-medium">Or sign up with</p>
              <div className="flex justify-center gap-4">
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:shadow-md transition-all w-24">
                  <FcGoogle size={20} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:shadow-md transition-all w-24">
                  <FaApple size={18} /> Apple
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Homepage Button */}
        <div className="flex justify-center mt-6 mb-4">
          <button
            onClick={goHome}
            className="px-6 py-3 rounded-xl font-semibold text-[#177529] border border-[#177529] hover:bg-[#177529] hover:text-white transition-all shadow-md"
          >
            Back to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
