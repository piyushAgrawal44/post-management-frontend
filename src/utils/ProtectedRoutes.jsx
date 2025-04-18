// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hook/Auth";
// import { ReactNode, useEffect, useState } from "react";

// export const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const { userState, token } = useAuth();
//     const [isClient, setIsClient] = useState(true)
//     useEffect(() => {
//         if (token && userState?.role) {
//             setIsClient(false)
//         }
//     }, [token, userState])
//     if (isClient) return null
//     else return token && userState?.role ? children : <Navigate to="/login" replace />;
// };

// export const GuestRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const { token } = useAuth();
//     const [isClient, setIsClient] = useState(true)
//     useEffect(() => {
//         if (!token) {
//             setIsClient(false)
//         }
//     }, [token])
//     if (isClient) return null
//     else return token ? <Navigate to="/" replace /> : children;
// };

// export const AdminRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const { userState, token } = useAuth();
//     const [isClient, setIsClient] = useState(true)
//     useEffect(() => {
//         if (token && userState?.role === 'admin') {
//             setIsClient(false)
//         }
//     }, [token, userState])
//     if (isClient) return null
//     else return token && userState?.role === "admin" ? children : <Navigate to="/" replace />;
// };

// export const UserRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
//     const { userState, token } = useAuth();
//     const [isClient, setIsClient] = useState(true)
//     useEffect(() => {
//         if (token && userState?.role === 'user') {
//             setIsClient(false)
//         }
//     }, [token, userState])
//     if (isClient) return null
//     else return token && userState?.role === "user" ? children : <Navigate to="/" replace />;
// };
