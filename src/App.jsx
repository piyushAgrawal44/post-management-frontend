import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { useAuth } from "./context/Auth";

import Navbar from "./components/layouts/Navbar";

const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Home"));
const AllPost = lazy(() => import("./pages/Posts/Posts"));
const SinglePost = lazy(() => import("./pages/Posts/SinglePost"));

const App = () => {
  const { token, myProfileApi } = useAuth();

  useEffect(() => {
    if (token) {
      myProfileApi();
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
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/all-posts" element={<AllPost />} />
          <Route path="/single-post/:id" element={<SinglePost />} />

          {/* route protect if user is login */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
