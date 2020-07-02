// @ts-nocheck
import axios, { AxiosInstance } from 'axios';

import { BASEURL } from './config';
import { MOCKTEMPLATEMAPDATA } from './config';
import mockApi from './mock';
import { ConfigType } from './mock';

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
        MOCKTEMPLATEMAPDATA[data.name] = { url: data.url, type: data.type };
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

export default api as AxiosInstance;
