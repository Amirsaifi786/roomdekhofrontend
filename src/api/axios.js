import axios from "axios";
import { logError, logInfo } from "../utils/logger";

const API = axios.create({
  baseURL: "https://roomdekhobackend-4.onrender.com/api",
});

// ✅ REQUEST INTERCEPTOR (AUTO TOKEN)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logInfo("API Request", {
      url: config.url,
      method: config.method,
      data: config.data,
    });

    return config;
  },
  (error) => {
    logError("Request Error", error);
    return Promise.reject(error);
  }
);

// ✅ RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {
    logInfo("API Response", response.data);
    return response;
  },
  (error) => {
    logError("Axios Global Error", error);

    if (error.response) {
      console.error("❌ Server Error:", error.response.data);

      // 🔥 AUTO LOGOUT IF TOKEN EXPIRED
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired, please login again");
        window.location.href = "/login";
      }

    } else if (error.request) {
      console.error("❌ No Response:", error.request);
    } else {
      console.error("❌ Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export const IMAGE_URL = "https://roomdekhobackend-4.onrender.com/uploads";
export default API;