import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Features/Context/AuthContext/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // خليها فوق الأول

  useEffect(() => {
    if (!user && !loading) {
      toast((t) => (
        <span className="flex gap-2 capitalize items-center">
          <a
            className="text-amber-600 underline uppercase font-semibold"
            href="/login"
          >
            login
          </a>{" "}
         to see your cart
        </span>
      ), { id: "must-login" }); 
      
      <Navigate to="/login" replace />
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loader"></span>
      </div>
    );
  }

  if (!user) {
    return null; // أو <Navigate to="/login" replace />
  }

  return children;
}

export default ProtectedRoute;
