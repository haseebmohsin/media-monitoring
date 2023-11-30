import axios from 'axios';
import history from '@history';

const frBaseUrl = process.env.REACT_APP_FR_BASE_URL;

const frApiService = async ({ method = 'GET', path, data }) => {
  const url = `${frBaseUrl}/${path}`;

  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer your-token', // Authorization header
  };

  const options = {
    method,
    url,
    // headers,
    data,
  };

  try {
    if ((method === 'POST' || method === 'PUT') && !data) {
      throw new Error('Data is missing');
    }

    if (method === 'DELETE' && data) {
      throw new Error('Data should not be sent for DELETE requests');
    }

    const response = await axios(options);

    return response.data;
  } catch (error) {
    if (error.message === 'Network Error') {
      throw new Error('Network Error');
    }

    const { status, data: errorData } = error;

    if (status === 404 || status === 500) {
      history.push({
        pathname: '/errorPage',
        query: { status },
      });
    }

    throw new Error(errorData?.error?.message || 'Unknown Error');
  }
};

export default frApiService;
