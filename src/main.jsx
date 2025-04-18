import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/Auth.jsx";
import "./index.css";
import { PostProvider } from "./context/Posts.jsx";
import './utils/i18n';
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
);
