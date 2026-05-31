import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

backend.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "Request Failed";

    // Prevent infinite loop on refresh endpoint itself
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // Initialize retry flag
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // Only handle 401s
    if (
      error.response?.status === 401 &&
      originalRequest._retryCount < MAX_REFRESH_ATTEMPTS
    ) {
      originalRequest._retryCount += 1;

      try {
        await backend.post("/auth/refresh");

        // Reset global attempts after success
        refreshAttempts = 0;

        // Retry original request
        return backend(originalRequest);
      } catch (refreshError) {
        refreshAttempts++;

        // Stop after max attempts
        if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
          refreshAttempts = 0;
        }

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
