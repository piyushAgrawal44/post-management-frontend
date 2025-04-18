import React, { useEffect } from "react";
import { useAuth } from "../../hook/Auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return <div>home</div>;
};

export default Home;
