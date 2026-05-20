import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

backend.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "Request Failed";

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await backend.post("/auth/refresh"); // cookies sent automatically
        return backend(originalRequest); // retry original with new cookie
      } catch (refreshError) {
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({
      ...error,
      message,
      success: false,
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);
