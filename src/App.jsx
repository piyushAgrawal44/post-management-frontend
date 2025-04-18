import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { useAuth } from "./hook/Auth";

import Navbar from "./components/Navbar";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Home = lazy(() => import("./pages/Home/Home"));

const App = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      // myProfileApi();
    }
  }, [token]);

  return (
    <div className="w-full h-[100vh]">
      <ToastContainer />
      
        <Navbar />
        <Suspense
          fallback={<div className="text-center mt-20 text-lg">Loading...</div>}
        >
          <Routes>
            <Route path="" element={<Home />} />

            {/* route protect if user is login */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Suspense>
    </div>
  );
};

export default App;
