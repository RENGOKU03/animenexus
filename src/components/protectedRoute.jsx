import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "../lib/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

/**
 * ProtectedRoute component checks if a user is authenticated.
 * If logged in, it renders its children. Otherwise, it redirects to the login page.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The components to render if the user is authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        console.log("User is authenticated", user);
        dispatch(login(user));
      } catch (error) {
        dispatch(logout());
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

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
