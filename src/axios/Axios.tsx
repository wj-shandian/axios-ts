import { AxiosRequestConfig, AxiosResponse } from "./types";
import qs from "qs";
import AxiosInterceptorManager, { Interceptor } from "./AxionsInstanceManager";
import parseHeaders from "parse-headers";
export default class Axios<T> {
  public interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse<T>>(),
  };
  // T 用来限制响应 对象response 里的 data类型
  request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    // return this.dispatchRequest<T>(config);
  }
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>(function (resolve, reject) {
      let { method = "GET", url = "", params, headers, data, timeout } = config;
      let request = new XMLHttpRequest();
      if (params) {
        params = qs.stringify(params);
        url += (url.indexOf("?") === -1 ? "?" : "&") + params;
      }

      request.open(method, url, true);
      request.responseType = "json";
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status >= 200 && request.status <= 300) {
            let response: AxiosResponse<T> = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config: config,
            };
            resolve(response);
          } else {
            // 接口状态码失败
            reject(`Error: Request failed with status code ${request.status}`);
          }
        }
      };
      if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key]);
        }
      }
      let body: string | null = null;
      if (data) {
        body = JSON.stringify(data);
      }
      request.onerror = function () {
        // 网络错误
        reject("net:ERR_INTERNET_DISCONNECTED");
      };
      // 超时错误
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = function () {
          reject(`Error: timeout of ${timeout}ms exceeded`);
        };
      }
      request.send(body);
    });
  }
}
