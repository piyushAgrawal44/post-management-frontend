import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../interceptor/interceptor";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const [loading, setLoading] = useState(false);
  const [loginAdminLoad, setLoginAdminLoad] = useState(false);
  const [userState, setUserState] = useState(null);

  const navigate = useNavigate();

  const signupApi = async (emailOrUserName, password) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/auth/signup`, {
        emailOrUserName,
        password,
      });
      if (data) {
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.message === "Email is already in use") {
        navigate("/login");
      }
      console.log("error", error);
    }
  };
  const loginApi = async (emailOrUserName, password) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(`/auth/login`, {
        emailOrUserName,
        password,
      });
      if (data) {
        setLoading(false);
        sessionStorage.setItem("token", data?.data?.token);
        setToken(data?.data?.token);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.data?.statusCode === 404) {
        navigate("/signup");
      }

      console.log("error", error);
    }
  };
  const loginAdminApi = async (emailOrUserName, password) => {
    try {
      setLoginAdminLoad(true);
      const { data } = await axiosInstance.post(`/auth/adminLogin`, {
        emailOrUserName,
        password,
      });
      if (data) {
        setLoginAdminLoad(false);
        sessionStorage.setItem("token", data?.data?.token);
        setToken(data?.data?.token);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginAdminLoad(false);
      console.log("error", error);
    }
  };

  const myProfileApi = async () => {
    try {
      const { data } = await axiosInstance.get(`/auth/my-profile`);
      setUserState(data?.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const all_states = {
    token,
    loading,
    loginAdminLoad,
    userState,
  };
  const all_states_update_func = {
    setToken,
    setUserState,
  };

  const all_api_controllers = {
    signupApi,
    loginApi,
    myProfileApi,
    loginAdminApi,
  };

  return (
    <AuthContext.Provider
      value={{
        ...all_states,
        ...all_states_update_func,
        ...all_api_controllers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
