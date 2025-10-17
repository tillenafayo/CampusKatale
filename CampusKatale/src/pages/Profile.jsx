import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

function Profile({ user }) {
    const navigate = useNavigate();
  // Default user object if none provided
  const defaultUser = {
    name: "Bwambale Reuel",
    email: "atwanbwambs@gmail.com",
    role: "User",
    avatar: "https://reuelbwambs.netlify.app/images/2.jpg",
    stats: {
      ads: 12,
      sells: 120,
      buys: 45,
    },
  };

  const currentUser = user || defaultUser;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          {/* Avatar */}
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#177529]"
            />
            <button className="absolute bottom-0 right-0 bg-[#97C040] p-2 rounded-full shadow-md hover:bg-[#F8C810] transition-all">
              <FaEdit className="text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-[#0C0D19]">
              {currentUser.name}
            </h1>
            <p className="text-gray-600">{currentUser.email}</p>
            <p className="text-[#177529] font-medium">{currentUser.role}</p>

            {/* Edit & Logout Buttons */}
            <div className="mt-4 flex gap-4">
              <button className="px-4 py-2 bg-[#177529] text-white rounded-xl hover:brightness-110 transition-all flex items-center gap-2" onClick={() => navigate("/")}>
                Back to Home
              </button>
              <button className="px-4 py-2 border border-[#177529] text-[#177529] rounded-xl hover:bg-[#177529] hover:text-white transition-all flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#F9FAFB] rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-[#177529]">
              {currentUser.stats.ads}
            </p>
            <p className="text-gray-600">Ads posted</p>
          </div>
          <div className="bg-[#F9FAFB] rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-[#177529]">
              {currentUser.stats.sells}
            </p>
            <p className="text-gray-600">Sales made</p>
          </div>
          <div className="bg-[#F9FAFB] rounded-xl shadow p-6 text-center">
            <p className="text-2xl font-bold text-[#177529]">
              {currentUser.stats.buys}
            </p>
            <p className="text-gray-600">Purchases Made</p>
          </div>
        </div>

        {/* Additional Content (Optional) */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-[#0C0D19] mb-4">About Me :)</h2>
          <p className="text-gray-600">
            Hi! I’m Reuel, a tech-loving student who enjoys developing solutions
            to real-world problems. Always learning, always exploring.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
