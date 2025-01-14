import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 overflow-hidden">
      <div className="text-center text-white">
        {/* Decorative Shapes */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400 rounded-full blur-3xl opacity-30 animate-ping"></div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide animate-bounce">
          Coming Soon!
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Something amazing is in the works. Stay tuned!
        </p>

        {/* Decorative Waves */}
        <div className="mt-10">
          <svg
            className="mx-auto w-32 md:w-48 text-indigo-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              d="M0,256L120,229.3C240,203,480,149,720,154.7C960,160,1200,224,1320,256L1440,288V320H0Z"
            ></path>
          </svg>
        </div>

        {/* Call-to-Action */}
        <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-lg shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-transform transform hover:-translate-y-1">
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
