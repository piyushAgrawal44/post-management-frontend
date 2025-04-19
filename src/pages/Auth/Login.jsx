import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import Button from "../../components/ui/Button";

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

  const loginAsDemoUser = async () => {
    await loginAdminApi("Piyush1", "Test@123");
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-xl">
       <Link to={'/'}><h6 className="text-blue-600 text-center font-bold mb-0 underline">BlogShare</h6></Link>
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>
        <form onSubmit={loginHandler} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email / Username</label>
            <input
              value={emailOrUserName}
              onChange={(e) => setEmailOrUserName(e.target.value)}
              type="text"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. piyush123 or user@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <Button
            onClick={loginHandler}
            loading={loading}
            text="Login"
            type="submit"
            color="bg-blue-500"
          />
        </form>
        <hr />
        <div className="flex gap-5 justify-between items-center mt-4">
          <Button
            onClick={loginAsAdmin}
            loading={loginAdminLoad}
            text="Login as Admin"
            color="bg-purple-500"
          />
          <Button
            onClick={loginAsDemoUser}
            loading={loginAdminLoad}
            text="Login as Demo User"
            color="bg-green-500"
          />
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
