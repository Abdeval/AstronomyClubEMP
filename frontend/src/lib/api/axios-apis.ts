import { api, astroApi, nasaApi } from "./axios-instance";

const createApiMethods = (instance: any) => ({
  get: (route: string, params?: any, headers?: any) =>
    instance.get(route, { params, headers }).then((res: any) => res.data),
  post: (route: string, body: any, args?: any) =>
    instance.post(route, body, args),
  delete: (route: string) =>
    instance.delete(route).then((res: any) => res.data),
  put: (route: string, body: any) =>
    instance.put(route, body).then((res: any) => res.data),
  patch: (route: string, body: any, options: object = {}) =>
    instance.patch(route, body, options).then((res: any) => res.data),
});

export const apiMethods = createApiMethods(api);
export const nasaApiMethods = createApiMethods(nasaApi);
export const astroApiMethods = createApiMethods(astroApi);

export const { get: getApi, post: postApi, delete: deleteApi, put: putApi, patch: patchApi } = apiMethods;
export const { get: getNasaApi, post: postNasaApi } = nasaApiMethods;
export const { get: getAstroApi, post: postAstroApi } = astroApiMethods;
