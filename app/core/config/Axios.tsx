import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL, { APP_ENV } from "../utils/BaseUrl";

interface TokenResponse {
  access: string;
  refresh: string;
}

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const createAxiosInstance = (port?: number): AxiosInstance => {
  // Provide default values and proper typing
  const { 
    HOST = 'localhost', 
    SOCIAL_PORT, 
    AUTH_PORT 
  } = APP_ENV as { 
    HOST?: string; 
    SOCIAL_PORT: number; 
    AUTH_PORT: number 
  };

  // Create baseURL with proper arguments
  const baseURL = (() => {
    if (port) {
      return HOST ? BASE_URL(HOST, port) : BASE_URL('localhost', port);
    }
    return HOST ? BASE_URL(HOST, SOCIAL_PORT) : BASE_URL('localhost', SOCIAL_PORT);
  })();

  const axiosInstance: AxiosInstance = axios.create({
    timeout: 30_000,
    baseURL,
  });

  // Request interceptor with correct config type
  axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (config.url?.includes("auth")) return config;

      const token = await AsyncStorage.getItem("USER_ACCESS");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response interceptor with improved error handling
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;
      if (!originalRequest) return Promise.reject(error);

      const refreshTokenURL = `${BASE_URL(HOST, AUTH_PORT)}/tawasalna-user/auth/refresh-token`;

      if (error.response?.status === 401) {
        if (originalRequest.url === refreshTokenURL) {
          await AsyncStorage.multiRemove(["USER_ACCESS", "USER_REFRESH"]);
          return Promise.reject(error);
        }

        if (!originalRequest._retry) {
          originalRequest._retry = true;

          const [refreshToken, expiredToken] = await Promise.all([
            AsyncStorage.getItem("USER_REFRESH"),
            AsyncStorage.getItem("USER_ACCESS"),
          ]);

          try {
            const { data } = await axios.post<TokenResponse>(
              refreshTokenURL,
              { expiredToken },
              { headers: { Authorization: `Bearer ${refreshToken}` } }
            );

            await AsyncStorage.multiSet([
              ["USER_ACCESS", data.access],
              ["USER_REFRESH", data.refresh],
            ]);

            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return axiosInstance(originalRequest);
          } catch (refreshError) {
            await AsyncStorage.multiRemove(["USER_ACCESS", "USER_REFRESH"]);
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;