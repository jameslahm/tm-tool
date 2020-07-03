import __SNOWPACK_ENV__ from '/__snowpack__/env.js';
import.meta.env = __SNOWPACK_ENV__;

// @ts-nocheck
import axios from '/web_modules/axios.js';
import { BASEURL } from './config.js';
import { MOCKTEMPLATEMAPDATA } from './config.js';
import mockApi from './mock.js';
let api;

if (import.meta.env.MODE === 'development') {
  api = mockApi;
  mockApi.register(
    '/templates',
    () => {
      return {
        data: MOCKTEMPLATEMAPDATA,
      };
    },
    'GET',
  );
  mockApi.register(
    '/templates/react-typescript-webpack',
    () => {
      return {
        data: MOCKTEMPLATEMAPDATA['react-typescipt-webpack'],
      };
    },
    'GET',
  );
  mockApi.register(
    '/templates/react-typescript-webpack',
    (config) => {
      const data = config?.data;

      if (data) {
        MOCKTEMPLATEMAPDATA[data.name] = {
          url: data.url,
          type: data.type,
        };
        return {
          data: config.data,
        };
      } else {
        return {
          status: 404,
        };
      }
    },
    'POST',
  );
} else {
  api = axios.create({
    baseURL: BASEURL,
  });
}

export default api;
