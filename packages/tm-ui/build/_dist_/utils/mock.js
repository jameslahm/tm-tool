const mockApi = {
  getInterceptors: [],
  postInterceptors: [],

  register(url, fn, type) {
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

  get(url, config) {
    return this.dispatch(url, 'GET', config);
  },

  post(url, config) {
    return this.dispatch(url, 'POST', config);
  },

  dispatch(url, type, config) {
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
