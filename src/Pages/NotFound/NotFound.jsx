import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-12 px-6">
      {/* الرقم 404 */}
      <h1 className="text-[120px] sm:text-[150px] font-extrabold text-amber-500 drop-shadow-md">
        404
      </h1>

      {/* العنوان */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        Oops! Page not found
      </h2>

      {/* الوصف */}
      <p className="text-gray-600 text-center max-w-md mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* زر العودة */}
      <button
        onClick={() => navigate("/")}
        className="bg-amber-500 text-white px-6 py-2 rounded-3xl shadow hover:bg-amber-600 transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}

export default NotFound;
