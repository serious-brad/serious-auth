import axios from 'axios';

export const baseURL = 'http://localhost:3000/api';

const axi = axios.create({
  withCredentials: true,
  baseURL
});

axi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

axi.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  let originalRequest = error.config;

  if (error.response.status === 401) {
    try {
      const res = await axios.get(`${baseURL}/refresh`, { withCredentials: true });
      localStorage.setItem('token', res.data.accessToken);
      return axi.request(originalRequest);
    } catch (e) {
      console.log(e)
    }

    throw error;
  }

});

export default axi;
