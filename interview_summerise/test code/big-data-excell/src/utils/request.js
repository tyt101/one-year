import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  // do something before request is sent
  (config) => config,
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const { data } = response;

    return data;
  },
  (error) => {
    console.log(`err${error}`); // for debug
    return Promise.reject(error);
  }
);
export default service;
