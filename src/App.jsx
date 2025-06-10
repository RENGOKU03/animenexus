import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import LoginError from "./components/loginError.jsx";
import Homepage from "./pages/Homepage.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Deepseek from "./components/deepseek.jsx";

function App() {
  function PublicRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);

    return isAuthenticated ? <Navigate to="/homepage" replace /> : children;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/loginError" element={<LoginError />} />
        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
