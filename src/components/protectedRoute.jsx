import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../lib/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";
import { Account, Client } from "appwrite";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        dispatch(login(user));
      } catch (error) {
        console.log("Authentication check failed:", error);
        dispatch(logout());
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <img src="/images/loading.gif" alt="loading-gif" />

        <p>Checking authentication...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
