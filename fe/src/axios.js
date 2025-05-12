import createApp from '@shopify/app-bridge';

const app = createApp({
  apiKey: 'YOUR_SHOPIFY_API_KEY',
  host: new URLSearchParams(window.location.search).get('host'),
  forceRedirect: true,
});

import { getSessionToken } from '@shopify/app-bridge-utils';

let sessionToken = null
getSessionToken(app).then((token) => {
  sessionToken = token
});

import axios from 'axios';

const axiosInApp = axios.create({
  baseURL: 'http://localhost:3000'
});

axiosInApp.interceptors.request.use(function (config) {
  if (sessionToken) {
      config.headers['Authorization'] = `Bearer ${sessionToken}`;
  }
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});


export default axiosInApp;