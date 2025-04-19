import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import Button from "../../components/ui/Button";

const Signup = () => {
  const [emailOrUserName, setEmailOrUserName] = useState("");
  const [password, setPassword] = useState("");
  const { token, signupApi, loading } = useAuth();

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    const data = await signupApi(emailOrUserName, password);
    if (data) {
      navigate("/login");
    }
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
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Account ✨</h2>
        <form onSubmit={signupHandler} className="space-y-4">
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
              placeholder="Create a password"
            />
          </div>

          <Button
            onClick={signupHandler}
            loading={loading}
            text="Sign Up"
            type="submit"
            color="bg-blue-500"
          />
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
