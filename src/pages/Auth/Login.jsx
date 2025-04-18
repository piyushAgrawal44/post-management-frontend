import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import Loader from "../../ui/Loader";

const Login = () => {
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const { token, loginApi, loginAdminApi, loading, loginAdminLoad } = useAuth();

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    await loginApi(emailOrUserName, password);
  };

  const loginAsAdmin = async () => {
    await loginAdminApi("admin@gmail.com", "password");
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email / Username</label>
            <input
              value={emailOrUserName}
              onChange={(e) => setEmailOrUserName(e.target.value)}
              type="text"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email / username"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition flex justify-center"
          >
            {loading ? <Loader color={"text-white"} /> : "Login"}
          </button>
          <button
            disabled={loginAdminLoad}
            type="button"
            onClick={() => loginAsAdmin()}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition flex justify-center"
          >
            {loginAdminLoad ? (
              <Loader color={"text-white"} />
            ) : (
              "Login as admin"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
