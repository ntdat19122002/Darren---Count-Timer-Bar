import axios from 'axios';
import store from './store/store';
import { getSessionToken } from '@shopify/app-bridge-utils';

const axiosInApp = axios.create({
  baseURL: 'https://ctbe.darren.io.vn'
});

axiosInApp.interceptors.request.use(async function (config) {
  const sessionToken = await getSessionToken(store.state.appBridge);
    if (sessionToken) {
        config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    return config;
}, function (error) {
    console.log(error);
    return Promise.reject(error);
});

export default axiosInApp;