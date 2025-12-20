import axios from "axios";
export const API_BASE_URL = "https://musify-app-2.onrender.com";
export const portal="admin";

// craete axios intance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// add interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response interceptor to handles error
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export const songsAPI = {
  add: (FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return apiClient.post(`/api/songs`, FormData, config);
  },
  list: () => {
    return apiClient.get(`/api/songs`);
  },
  remove: (id) => {
    return apiClient.delete(`/api/songs/${id}`);
  },
};
export const albumsAPI = {
  add: (FormData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return apiClient.post(`/api/albums`, FormData, config);
  },
  list: () => {
    return apiClient.get(`/api/albums`);
  },
  remove: (id) => {
    return apiClient.delete(`/api/albums/${id}`);
  },
};

export default apiClient;
