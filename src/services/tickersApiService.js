import store from 'app/store/index';
import axios from 'axios';

const tickersBaseUrl = process.env.REACT_APP_TICKERS_BASE_URL;

const axiosInstance = axios.create({
  baseURL: tickersBaseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response?.data,

  (error) => {
    // Handle error globally, e.g., dispatch an action to update the error state in Redux.
    store.dispatch({ message: 'Something went wrong' });
    return Promise.reject(error);
  }
);

const tickersApiService = {
  get: (endpoint) => axiosInstance.get(endpoint),
  post: (endpoint, data) => axiosInstance.post(endpoint, data),
};

export default tickersApiService;
