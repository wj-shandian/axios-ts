import AxiosInterceptorManager from "./AxiosInstanceManager";
export type Methods =
  | "get"
  | "GET"
  | "POST"
  | "post"
  | "put"
  | "PUT"
  | "delete"
  | "DELETE"
  | "options"
  | "OPTIONS";

export interface AxiosRequestConfig {
  url?: string;
  method?: Methods;
  // params?: Record<string, any>; // Record 和 [name:string]:any 效果一样 意思是字段是字符串 值可以是任何值
  params?: any;
  headers?: Record<string, any>;
  data?: Record<string, any>;
  timeout?: number;
}

// promise 的泛型 T代表此 promise 变成成功态 之后resolve 的值 resolve(value)
export interface AxiosInstance {
  <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  };
}

// 泛型 T 代表响应体到类型 T=any 意思给个默认值 是any

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: Record<string, any>;
  config?: AxiosRequestConfig;
  request?: XMLHttpRequest;
}
