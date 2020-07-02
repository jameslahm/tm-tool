type RequestMethodType = 'GET' | 'POST';

interface ResponseType {
  data?: {};
  headers?: {};
  status?: number;
}

export interface ConfigType {
  headers: {};
  params: {};
  data: {};
}

interface handleFn {
  path: string;
  handle: (config?: ConfigType) => ResponseType;
}

interface mockApiType {
  getInterceptors: handleFn[];
  postInterceptors: handleFn[];
  get: (url: string, config?: ConfigType) => Promise<ResponseType>;
  post: (url: string, config?: ConfigType) => Promise<ResponseType>;
  register: (
    url: string,
    fn: (config?: ConfigType) => ResponseType,
    type: RequestMethodType,
  ) => void;
  dispatch: (
    url: string,
    method: RequestMethodType,
    config?: ConfigType,
  ) => Promise<ResponseType>;
  dispatchMap: Record<RequestMethodType, handleFn[]>;
}

const mockApi: mockApiType = {
  getInterceptors: [],
  postInterceptors: [],
  register(
    url: string,
    fn: (config?: ConfigType) => ResponseType,
    type: RequestMethodType,
  ) {
    const handleFn = {
      path: url,
      handle: fn,
    };
    if (type === 'GET') this.getInterceptors.push(handleFn);
    else if (type === 'POST') this.postInterceptors.push(handleFn);
    else {
      this.getInterceptors.push(handleFn);
      this.postInterceptors.push(handleFn);
    }
  },
  get(url, config?: ConfigType) {
    return this.dispatch(url, 'GET', config);
  },
  post(url, config) {
    return this.dispatch(url, 'POST', config);
  },
  dispatch(url: string, type: RequestMethodType, config?: ConfigType) {
    const handle = this.dispatchMap[type].find((e) => {
      console.log(e.path);
      console.log(url);
      return e.path === url;
    })?.handle;
    if (handle) return Promise.resolve(handle(config));
    else {
      console.error('Warning! Not Register Route be Requested');
      return Promise.reject({
        status: 404,
        data: {},
        headers: {},
      });
    }
  },
  get dispatchMap() {
    return {
      GET: this.getInterceptors,
      POST: this.postInterceptors,
    };
  },
};

export default mockApi;
