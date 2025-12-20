import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://api.kls-tech.local',
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // In production we can hook into a toast/monitoring service here
    return Promise.reject(error);
  },
);

